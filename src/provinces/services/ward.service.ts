import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../core';
import { WardRepository } from '../repositories/ward.repository';
import { paginate } from 'nestjs-typeorm-paginate';
import { GetListWardRequestDto } from '../dtos/requests/get-list-ward.request.dto';

@Injectable()
export class WardService {
  private readonly _logger = new LoggerService(WardService.name);

  constructor(private readonly wardRepository: WardRepository) {}

  async getList(dto: GetListWardRequestDto) {
    const { limit, page, provinceId, name } = dto;

    const queryBuilder = this.wardRepository.createQueryBuilder('ward');

    queryBuilder.where('ward.provinceId = :provinceId', {
      provinceId,
    });

    if (name) {
      queryBuilder.andWhere('ward.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    queryBuilder.orderBy('ward.id', 'ASC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return {
      data: items,
      pagination: meta,
    };
  }
}
