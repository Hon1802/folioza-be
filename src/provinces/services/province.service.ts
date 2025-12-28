import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../core';
import { ProvinceRepository } from '../repositories/province.repository';
import { GetListProvinceRequestDto } from '../dtos/requests/get-list-province.request.dto';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProvinceService {
  private readonly _logger = new LoggerService(ProvinceService.name);

  constructor(private readonly provinceRepository: ProvinceRepository) {}

  async getList(dto: GetListProvinceRequestDto) {
    const { limit, page, name } = dto;

    const queryBuilder = this.provinceRepository.createQueryBuilder('province');

    if (name) {
      queryBuilder.where('province.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    queryBuilder.orderBy('province.id', 'ASC');

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
