import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { UserChildrenRepository } from 'src/users/repositories/user-children.repository';
import { Transactional } from 'typeorm-transactional';
import {
  ConflictExc,
  NotFoundExc,
} from '../../../common/exceptions/custom-http.exception';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { generateRandomCode } from '../../../common/utils/generation.util';
import { LoggerService } from '../../../core';
import { UserJourneyGetListRequestDto } from '../../dtos/requests/user/user-journey.get-list.request.dto';
import { JourneyStatusEnum } from '../../enums/journey.enum';
import { UserJourneyDetailStatusEnum } from '../../enums/user-journey-detail.enum';
import { UserJourneyStatusEnum } from '../../enums/user-journey.enum';
import { JourneyDetailRepository } from '../../repositories/journey-detail.repository';
import { JourneyRepository } from '../../repositories/journey.repository';
import { UserJourneyDetailRepository } from '../../repositories/user-journey-detail.repository';
import { UserJourneyRepository } from '../../repositories/user-journey.repository';

@Injectable()
export class JourneyUserService {
  private readonly _logger = new LoggerService(JourneyUserService.name);

  constructor(
    private readonly journeyRepository: JourneyRepository,
    private readonly journeyDetailRepository: JourneyDetailRepository,
    private readonly userJourneyRepository: UserJourneyRepository,
    private readonly userJourneyDetailRepository: UserJourneyDetailRepository,
    private readonly userChildrenRepository: UserChildrenRepository,
  ) {}

  async getList(dto: UserJourneyGetListRequestDto) {
    const { page, limit } = dto;

    const queryBuilder = this.journeyRepository
      .createQueryBuilder('journey')
      .leftJoinAndSelect('journey.gift', 'gift')
      .leftJoinAndSelect('journey.journeyDetails', 'journeyDetails')
      .where('journey.status = :status', {
        status: JourneyStatusEnum.ACTIVE,
      })
      .andWhere('journey.startDate <= NOW()')
      .andWhere('journey.endDate >= NOW()')
      .orderBy('journey.startDate', 'DESC');

    queryBuilder.orderBy('journey.startDate', 'DESC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return {
      data: items,
      pagination: meta,
    };
  }

  async getById(id: number) {
    const journey = await this.journeyRepository.findActiveById(id);

    if (!journey) {
      throw new NotFoundExc('Không tìm thấy phiếu hành trình!');
    }

    const journeyDetails = await this.journeyDetailRepository.find({
      where: { journeyId: journey.id },
      order: { order: 'ASC' },
    });

    journey.journeyDetails = journeyDetails;

    return journey;
  }

  @Transactional()
  async start(userAuth: UserAuthenticatedInterface, id: number) {
    const journey = await this.getById(id);

    // Get user children
    const userChildren = await this.userChildrenRepository.find({
      where: { userId: userAuth.id },
    });

    if (!userChildren.length) {
      throw new ConflictExc(
        'Bạn cần thêm thông tin bé trước khi bắt đầu hành trình!',
      );
    }

    // Create user journeys and details for each child
    const userJourneys = [];

    for (const userChild of userChildren) {
      // Check if this child already started this journey
      const userJourneyExisted = await this.userJourneyRepository.findOne({
        where: {
          userId: userAuth.id,
          userChildId: userChild.id,
          journeyId: journey.id,
        },
      });

      if (userJourneyExisted) {
        throw new ConflictExc(
          `Bé ${userChild.name} đã bắt đầu hành trình này!`,
        );
      }

      // Create user journey for this child
      const userJourney = await this.userJourneyRepository.save({
        userId: userAuth.id,
        userChildId: userChild.id,
        journeyId: journey.id,
        ticketCode: generateRandomCode(),
        status: UserJourneyStatusEnum.PENDING,
      });

      // Create user journey details for this child
      const userJourneyDetails = journey.journeyDetails
        .filter((journeyDetail) => journeyDetail.required)
        .map((journeyDetail) => ({
          userId: userAuth.id,
          userJourneyId: userJourney.id,
          userChildId: userChild.id,
          journeyDetailId: journeyDetail.id,
          status: UserJourneyDetailStatusEnum.PENDING,
        }));
      await this.userJourneyDetailRepository.insert(userJourneyDetails);

      userJourneys.push(userJourney);
    }

    return userJourneys;
  }
}
