import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  ConflictExc,
  NotFoundExc,
} from '../../../common/exceptions/custom-http.exception';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { LoggerService } from '../../../core';
import { CreateOrderUserDataInterface } from '../../../orders/interfaces/user/order.user.interface';
import { OrderUserService } from '../../../orders/services/user/order.user.service';
import { UserRepository } from '../../../users/repositories/user.repository';
import { UserJourneyConfirmRewardRequestDto } from '../../dtos/requests/user/user-journey.confirm-reward.request.dto';
import { UserJourneyStatusEnum } from '../../enums/user-journey.enum';
import { JourneyDetailRepository } from '../../repositories/journey-detail.repository';
import { JourneyRepository } from '../../repositories/journey.repository';
import { UserJourneyDetailRepository } from '../../repositories/user-journey-detail.repository';
import { UserJourneyRepository } from '../../repositories/user-journey.repository';

@Injectable()
export class UserJourneyUserService {
  private readonly _logger = new LoggerService(UserJourneyUserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly journeyRepository: JourneyRepository,
    private readonly journeyDetailRepository: JourneyDetailRepository,
    private readonly userJourneyRepository: UserJourneyRepository,
    private readonly userJourneyDetailRepository: UserJourneyDetailRepository,
    private readonly orderUserService: OrderUserService,
  ) {}

  async getByJourneyId(
    userAuth: UserAuthenticatedInterface,
    journeyId: number,
  ) {
    const userJourneys = await this.userJourneyRepository.find({
      where: { userId: userAuth.id, journeyId },
      relations: ['userJourneyDetails', 'userChild'],
    });

    if (!userJourneys.length) {
      throw new NotFoundExc('Không tìm thấy hành trình của các bé!');
    }

    return userJourneys;
  }

  @Transactional()
  async confirmReward(
    userAuth: UserAuthenticatedInterface,
    dto: UserJourneyConfirmRewardRequestDto,
  ) {
    const { userJourneyIds, deliveryMethod, address, wardId, provinceId } = dto;
    const { user, userJourneys, journeys } = await this.validateEntities(
      userAuth.id,
      userJourneyIds,
    );
    const orderData: CreateOrderUserDataInterface = {
      data: userJourneys.map((uj) => ({
        giftId: uj.journey.giftId,
        quantity: 1,
        userJourneyId: uj.id,
      })),
      address,
      wardId,
      provinceId,
    };

    const [_, order] = await Promise.all([
      // Update user journey
      this.userJourneyRepository.update(
        { id: In(userJourneyIds) },
        { status: UserJourneyStatusEnum.CONFIRMED_REWARD },
      ),
      // Create order
      this.orderUserService.createJourneyOrder(user, orderData, deliveryMethod),
    ]);

    return order;
  }

  private async validateEntities(userId: number, userJourneyIds: number[]) {
    const errorList: string[] = [];

    const [user, userJourneys] = await Promise.all([
      this.userRepository.findByIdAndActive(userId),
      this.userJourneyRepository.find({
        where: { id: In(userJourneyIds), userId },
        relations: ['journey', 'journey.gift'],
      }),
    ]);

    if (!user) {
      throw new NotFoundExc('Không tìm thấy người dùng!');
    }

    if (!userJourneys.length) {
      throw new NotFoundExc('Không tìm thấy hành trình nào của người dùng!');
    }

    for (const uj of userJourneys) {
      if (uj.status === UserJourneyStatusEnum.CONFIRMED_REWARD) {
        errorList.push(`Hành trình ID=${uj.id}: bạn đã nhận phần thưởng rồi.`);
        continue;
      }

      if (uj.status !== UserJourneyStatusEnum.COMPLETED) {
        errorList.push(`Hành trình ID=${uj.id}: chưa hoàn thành.`);
        continue;
      }
    }

    if (errorList.length > 0) {
      throw new ConflictExc({
        message: 'Một hoặc nhiều hành trình không hợp lệ.',
        details: errorList,
      });
    }

    return {
      user,
      userJourneys,
      journeys: userJourneys.map((uj) => uj.journey),
    };
  }
}
