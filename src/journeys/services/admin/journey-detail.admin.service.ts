import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  InternalServerErrorExc,
  NotFoundExc,
} from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { CreateJourneyDetailAdminRequestDto } from '../../dtos/requests/admin/create-journey-detail.admin.request.dto';
import { GetListJourneyDetailAdminRequestDto } from '../../dtos/requests/admin/get-list-journey-detail.admin.request.dto';
import { UpdateJourneyDetailAdminRequestDto } from '../../dtos/requests/admin/update-journey-detail.admin.request.dto';
import { JourneyDetailRepository } from '../../repositories/journey-detail.repository';
import { JourneyRepository } from '../../repositories/journey.repository';

@Injectable()
export class JourneyDetailAdminService {
  private readonly _logger = new LoggerService(JourneyDetailAdminService.name);

  constructor(
    private readonly journeyDetailRepository: JourneyDetailRepository,
    private readonly journeyRepository: JourneyRepository,
  ) {}

  async getList(dto: GetListJourneyDetailAdminRequestDto) {
    const { page, limit, name } = dto;

    const queryBuilder =
      this.journeyDetailRepository.createQueryBuilder('journeyDetail');

    queryBuilder.where('1 = 1');

    if (name) {
      queryBuilder.andWhere('journeyDetail.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    queryBuilder.orderBy('journeyDetail.order', 'ASC');

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
    const journeyDetail = await this.journeyDetailRepository.findOneBy({ id });

    if (!journeyDetail) {
      throw new NotFoundExc('Không tìm thấy mốc hành trình!');
    }

    return journeyDetail;
  }

  async create(dto: CreateJourneyDetailAdminRequestDto) {
    // Validate journey setup data
    await this.validateJourneySetupData(dto.journeyId);

    // Create journey detail
    const journeyDetailCreated = await this.journeyDetailRepository.save(dto);

    return journeyDetailCreated;
  }

  async update(dto: UpdateJourneyDetailAdminRequestDto, id: number) {
    // Validate journey setup data
    await this.validateJourneySetupData(dto.journeyId);

    const journeyDetail = await this.journeyDetailRepository.findOneBy({
      id,
    });
    if (!journeyDetail) {
      throw new NotFoundExc('Không tìm thấy mốc hành trình!');
    }

    // Update journey detail
    const journeyDetailUpdated = await this.journeyDetailRepository.update(
      { id },
      dto,
    );

    if (!journeyDetailUpdated) {
      throw new InternalServerErrorExc('Cập nhật mốc hành trình thất bại!');
    }

    return await this.getById(id);
  }

  async deleteById(id: number) {
    const journeyDetail = await this.getById(id);

    // Delete journey detail
    const { affected } = await this.journeyDetailRepository.delete(
      journeyDetail.id,
    );

    if (!affected) {
      throw new InternalServerErrorExc('Xóa mốc hành trình thất bại!');
    }

    return 'ok';
  }

  async validateJourneySetupData(journeyId: number) {
    const journey = await this.journeyRepository.findOneBy({
      id: journeyId,
    });

    if (!journey) {
      throw new NotFoundExc('Không tìm thấy phiếu hành trình!');
    }
  }
}
