import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { InternalServerErrorExc } from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { CreateGiftCategoryAdminRequestDto } from '../../dtos/requests/admin/create.gift-category.admin.request.dto';
import { GetListGiftCategoryAdminRequestDto } from '../../dtos/requests/admin/get-list.gift-category.admin.request.dto';
import { UpdateGiftCategoryAdminRequestDto } from '../../dtos/requests/admin/update.gift-category.admin.request.dto';
import { GiftCategoryRepository } from '../../repositories/gift-category.repository';
@Injectable()
export class GiftCategoryAdminService {
  private readonly _logger = new LoggerService(GiftCategoryAdminService.name);

  constructor(
    private readonly giftCategoryRepository: GiftCategoryRepository,
  ) {}

  async getList(dto: GetListGiftCategoryAdminRequestDto) {
    const { page, limit, name, status } = dto;

    const queryBuilder =
      this.giftCategoryRepository.createQueryBuilder('giftCategory');

    queryBuilder.where('1 = 1');

    if (name) {
      queryBuilder.andWhere('giftCategory.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('giftCategory.status = :status', {
        status,
      });
    }

    queryBuilder.orderBy('giftCategory.priority', 'ASC');

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
    const giftCategory = await this.giftCategoryRepository.findOneBy({
      id,
    });

    if (!giftCategory) {
      throw new Error('Không tìm thấy danh mục quà!');
    }

    return giftCategory;
  }

  async deleteById(id: number) {
    // Check if gift category exists
    const giftCategory = await this.getById(id);

    // Delete gift category
    const { affected } = await this.giftCategoryRepository.delete(
      giftCategory.id,
    );

    if (!affected) {
      throw new InternalServerErrorExc('Xóa danh mục quà thất bại!');
    }

    return 'ok';
  }

  async create(dto: CreateGiftCategoryAdminRequestDto) {
    const giftCategoryCreated = await this.giftCategoryRepository.save(dto);

    return giftCategoryCreated;
  }

  async update(dto: UpdateGiftCategoryAdminRequestDto, id: number) {
    // Check if gift category exists
    const giftCategory = await this.getById(id);

    // Update gift category
    const giftCategoryUpdated = await this.giftCategoryRepository.save({
      ...giftCategory,
      ...dto,
    });

    return giftCategoryUpdated;
  }
}
