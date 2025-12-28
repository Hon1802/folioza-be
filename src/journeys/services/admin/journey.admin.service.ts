import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  InternalServerErrorExc,
  NotFoundExc,
} from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { GiftRepository } from '../../../gifts/repositories/gift.repository';
import { CreateJourneyAdminRequestDto } from '../../dtos/requests/admin/create-journey.admin.request.dto';
import { GetListJourneyAdminRequestDto } from '../../dtos/requests/admin/get-list-journey.admin.request.dto';
import { UpdateJourneyAdminRequestDto } from '../../dtos/requests/admin/update-journey.admin.request.dto';
import { JourneyRepository } from '../../repositories/journey.repository';

@Injectable()
export class JourneyAdminService {
  private readonly _logger = new LoggerService(JourneyAdminService.name);

  constructor(
    private readonly journeyRepository: JourneyRepository,
    private readonly giftRepository: GiftRepository,
  ) {}

  async getList(dto: GetListJourneyAdminRequestDto) {
    const { page, limit, name, status, startDate, endDate } = dto;

    const queryBuilder = this.journeyRepository
      .createQueryBuilder('journey')
      .leftJoinAndSelect('journey.gift', 'gift');

    queryBuilder.where('1 = 1');

    if (name) {
      queryBuilder.andWhere('journey.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('journey.status = :status', {
        status,
      });
    }

    if (startDate) {
      queryBuilder.andWhere('journey.start_date >= :startDate', {
        startDate,
      });
    }

    if (endDate) {
      queryBuilder.andWhere('journey.end_date <= :endDate', {
        endDate,
      });
    }

    queryBuilder.orderBy('journey.startDate', 'ASC');

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
    const journey = await this.journeyRepository.findOne({
      where: { id },
      relations: ['gift'],
    });

    if (!journey) {
      throw new NotFoundExc('Không tìm thấy phiếu hành trình!');
    }

    return journey;
  }

  async create(dto: CreateJourneyAdminRequestDto) {
    // Validate gift setup data
    await this.validateGiftSetupData(dto.giftId);

    // Create journey
    const journeyCreated = await this.journeyRepository.save(dto);

    return journeyCreated;
  }

  async update(dto: UpdateJourneyAdminRequestDto, id: number) {
    // Validate gift setup data
    await this.validateGiftSetupData(dto.giftId);

    const journey = await this.journeyRepository.findOneBy({
      id,
    });
    if (!journey) {
      throw new NotFoundExc('Không tìm thấy phiếu hành trình!');
    }

    // Update journey
    const journeyUpdated = await this.journeyRepository.save({
      ...journey,
      ...dto,
    });

    return journeyUpdated;
  }

  async deleteById(id: number) {
    const journey = await this.getById(id);

    // Delete journey
    const { affected } = await this.journeyRepository.delete(journey.id);

    if (!affected) {
      throw new InternalServerErrorExc('Xóa phiếu hành trình thất bại!');
    }

    return 'ok';
  }

  async validateGiftSetupData(giftId: number) {
    const gift = await this.giftRepository.findOneBy({
      id: giftId,
    });

    if (!gift) {
      throw new NotFoundExc('Không tìm thấy quà!');
    }
  }
}
