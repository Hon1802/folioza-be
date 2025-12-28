import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { NotFoundExc } from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { GetListUserJourneyAdminRequestDto } from '../../dtos/requests/admin/user-journey.admin.request.dto';
import { JourneyDetailRepository } from '../../repositories/journey-detail.repository';
import { JourneyRepository } from '../../repositories/journey.repository';
import { UserJourneyDetailRepository } from '../../repositories/user-journey-detail.repository';
import { UserJourneyRepository } from '../../repositories/user-journey.repository';
import { In } from 'typeorm';

@Injectable()
export class UserJourneyAdminService {
  private readonly _logger = new LoggerService(UserJourneyAdminService.name);

  constructor(
    private readonly journeyRepository: JourneyRepository,
    private readonly journeyDetailRepository: JourneyDetailRepository,
    private readonly userJourneyRepository: UserJourneyRepository,
    private readonly userJourneyDetailRepository: UserJourneyDetailRepository,
  ) {}

  async getList(dto: GetListUserJourneyAdminRequestDto) {
    const { page, limit, name, phoneNumber, ticketCode, journeyId } = dto;

    const queryBuilder = this.userJourneyRepository
      .createQueryBuilder('userJourney')
      .leftJoin('userJourney.user', 'user')
      .leftJoin('userJourney.journey', 'journey')
      .select(['userJourney.id']);

    queryBuilder.where('1 = 1');

    if (journeyId) {
      queryBuilder.andWhere('userJourney.journeyId = :journeyId', {
        journeyId,
      });
    }

    if (ticketCode) {
      queryBuilder.andWhere('userJourney.ticketCode ILIKE :ticketCode', {
        ticketCode: `%${ticketCode}%`,
      });
    }

    if (name) {
      queryBuilder.andWhere('user.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (phoneNumber) {
      queryBuilder.andWhere('user.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: `%${phoneNumber}%`,
      });
    }

    queryBuilder.orderBy('userJourney.id', 'DESC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    const userJourneyIds = items.map((userJourney) => userJourney.id);

    const userJourneysWithRelations = await this.userJourneyRepository.find({
      where: { id: In(userJourneyIds) },
      relations: [
        'user',
        'journey',
        'userJourneyDetails',
        'userJourneyDetails.userChild',
      ],
      order: { id: 'DESC' },
    });

    return {
      data: userJourneysWithRelations,
      pagination: meta,
    };
  }

  async getById(id: number) {
    const userJourney = await this.userJourneyRepository.findOne({
      where: { id },
      relations: [
        'user',
        'journey',
        'journey.gift',
        'userJourneyDetails',
        'userJourneyDetails.journeyDetail',
        'userJourneyDetails.userChild',
        'userJourneyDetails.verifiedByAdmin',
      ],
    });

    if (!userJourney) {
      throw new NotFoundExc('Không tìm thấy hành trình của người dùng!');
    }

    return userJourney;
  }
}
