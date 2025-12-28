import { Injectable } from '@nestjs/common';
import { group } from 'radash';
import { Transactional } from 'typeorm-transactional';
import { NotFoundExc } from '../../../common/exceptions/custom-http.exception';
import { AdminAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { getNowAtTimezone } from '../../../common/utils/datetime.util';
import { LoggerService } from '../../../core';
import { SocketEventEnum } from '../../../socket/enums/socket-event.enum';
import { SocketService } from '../../../socket/services/socket.service';
import { UserStatusEnum } from '../../../users/enums/user.enum';
import { UserRepository } from '../../../users/repositories/user.repository';
import { JourneyEntity } from '../../entities/journey.entity';
import { UserJourneyEntity } from '../../entities/user-journey.entity';
import { UserJourneyDetailStatusEnum } from '../../enums/user-journey-detail.enum';
import { UserJourneyStatusEnum } from '../../enums/user-journey.enum';
import { JourneyDetailRepository } from '../../repositories/journey-detail.repository';
import { JourneyRepository } from '../../repositories/journey.repository';
import { UserJourneyDetailRepository } from '../../repositories/user-journey-detail.repository';
import { UserJourneyRepository } from '../../repositories/user-journey.repository';

@Injectable()
export class UserJourneyDetailAdminService {
  private readonly _logger = new LoggerService(
    UserJourneyDetailAdminService.name,
  );

  constructor(
    private readonly userRepository: UserRepository,
    private readonly journeyRepository: JourneyRepository,
    private readonly journeyDetailRepository: JourneyDetailRepository,
    private readonly userJourneyRepository: UserJourneyRepository,
    private readonly userJourneyDetailRepository: UserJourneyDetailRepository,
    private readonly socketService: SocketService,
  ) {}

  async getById(userJourneyDetailId: number) {
    const userJourneyDetail = await this.userJourneyDetailRepository
      .createQueryBuilder('ujd')
      .leftJoinAndSelect('ujd.user', 'u')
      .leftJoinAndSelect('ujd.userChild', 'uc')
      .leftJoin('ujd.journeyDetail', 'jd')
      .leftJoinAndMapOne(
        'ujd.journey',
        JourneyEntity,
        'j',
        'j.id = jd.journeyId',
      )
      .leftJoinAndMapOne(
        'ujd.userJourney',
        UserJourneyEntity,
        'uj',
        'uj.userId = u.id AND uj.journeyId = j.id',
      )
      .select(['ujd'])
      .addSelect([
        'u.id',
        'u.phoneNumber',
        'u.name',
        'jd.id',
        'jd.name',
        'jd.order',
        'j.id',
        'j.name',
        'uj.id',
        'uc.id',
        'uc.name',
        'uc.age',
      ])
      .where('ujd.id = :id', { id: userJourneyDetailId })
      .getOne();

    return userJourneyDetail;
  }

  @Transactional()
  async approve(
    userJourneyDetailId: number,
    admin: AdminAuthenticatedInterface,
  ) {
    const [validate] = await this.validateEntities(userJourneyDetailId);

    const userJourneyDetailList = await this.userJourneyDetailRepository.find({
      where: {
        userId: validate?.user.id,
        userJourneyId: validate?.userJourney.id,
      },
    });

    if (!userJourneyDetailList.length) {
      throw new NotFoundExc(
        'Không tìm thấy chi tiết hành trình của người dùng!',
      );
    }

    const grouped = group(userJourneyDetailList, (item) => item.status);
    const pendingList = grouped[UserJourneyDetailStatusEnum.PENDING] || [];
    const completedList = grouped[UserJourneyDetailStatusEnum.COMPLETED] || [];

    const target = pendingList.find((item) => item.id === userJourneyDetailId);

    if (!target) {
      throw new NotFoundExc(
        'Không tìm thấy mốc hành trình đang chờ duyệt của người dùng!',
      );
    }

    let newStatus: UserJourneyStatusEnum | null = null;

    if (pendingList.length === 1) {
      newStatus = UserJourneyStatusEnum.COMPLETED;
    } else if (completedList.length === 0) {
      newStatus = UserJourneyStatusEnum.IN_PROCESSING;
    } else {
      newStatus = UserJourneyStatusEnum.IN_PROCESSING;
    }

    await Promise.all([
      this.userJourneyRepository.update(validate?.userJourney.id, {
        status: newStatus,
      }),
      this.userJourneyDetailRepository.update(target.id, {
        status: UserJourneyDetailStatusEnum.COMPLETED,
        verifiedByAdminId: admin?.id,
        verifiedDate: getNowAtTimezone(),
      }),
    ]);

    const userJourneyDetail = await this.getById(userJourneyDetailId);
    const userJourneySummary = {
      userJourneyDetail,
      completed: completedList.length + 1,
      pending: pendingList.length - 1,
      total: userJourneyDetailList.length,
    };

    // Notify user
    this.socketService.emitToUser(
      validate?.user.id,
      SocketEventEnum.JOURNEY_DETAIL_APPROVED,
      userJourneySummary,
    );

    return 'ok';
  }

  private async validateEntities(userJourneyDetailId: number) {
    const validate = await this.userJourneyDetailRepository
      .createQueryBuilder('ujd')
      .innerJoinAndSelect('ujd.user', 'u', 'u.status = :status', {
        status: UserStatusEnum.ACTIVE,
      })
      .innerJoinAndSelect('ujd.journeyDetail', 'jd')
      .innerJoinAndMapOne(
        'ujd.userJourney',
        UserJourneyEntity,
        'uj',
        'uj.id = ujd.userJourneyId',
      )
      .where('ujd.id = :id', { id: userJourneyDetailId })
      .getOne();

    if (!validate) {
      throw new NotFoundExc(
        'Không hợp lệ: user (ACTIVE), journey, userJourney phải tồn tại',
      );
    }

    return [validate];
  }
}
