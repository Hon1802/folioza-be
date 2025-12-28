import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  InternalServerErrorExc,
  NotFoundExc,
} from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { CreateGiftAdminRequestDto } from '../../dtos/requests/admin/create.gift.admin.request.dto';
import { GetListGiftAdminRequestDto } from '../../dtos/requests/admin/get-list.gift.admin.request.dto';
import { UpdateGiftAdminRequestDto } from '../../dtos/requests/admin/update.gift.admin.request.dto';
import { GiftCategoryRepository } from '../../repositories/gift-category.repository';
import { GiftRepository } from '../../repositories/gift.repository';

@Injectable()
export class GiftAdminService {
  private readonly _logger = new LoggerService(GiftAdminService.name);

  constructor(
    private readonly giftRepository: GiftRepository,
    private readonly giftCategoryRepository: GiftCategoryRepository,
  ) {}

  async getList(dto: GetListGiftAdminRequestDto) {
    const { page, limit, name, status, type } = dto;

    const queryBuilder = this.giftRepository
      .createQueryBuilder('gift')
      .leftJoinAndSelect('gift.giftCategory', 'giftCategory');

    queryBuilder.where('1 = 1');

    if (name) {
      queryBuilder.andWhere('gift.name ILIKE :name', {
        name: `%${name}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('gift.status = :status', {
        status,
      });
    }

    if (type) {
      queryBuilder.andWhere('gift.type = :type', {
        type,
      });
    }

    queryBuilder.orderBy('gift.priority', 'ASC');

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
    const gift = await this.giftRepository.findOne({
      where: { id },
      relations: ['giftCategory', 'file'],
    });

    if (!gift) {
      throw new NotFoundExc('Không tìm thấy quà!');
    }

    return gift;
  }

  async deleteById(id: number) {
    const gift = await this.getById(id);

    // Delete gift
    const { affected } = await this.giftRepository.delete(gift.id);

    if (!affected) {
      throw new InternalServerErrorExc('Xóa quà thất bại!');
    }

    return 'ok';
  }

  async create(dto: CreateGiftAdminRequestDto) {
    // Validate gift category setup data
    await this.validateGiftCategorySetupData(dto.giftCategoryId);

    // Create gift
    const giftCreated = await this.giftRepository.save(dto);

    return giftCreated;
  }

  async update(dto: UpdateGiftAdminRequestDto, id: number) {
    // Validate gift category setup data
    await this.validateGiftCategorySetupData(dto.giftCategoryId);

    const gift = await this.giftRepository.findOneBy({
      id,
    });
    if (!gift) {
      throw new NotFoundExc('Không tìm thấy quà!');
    }

    // Update gift
    const giftUpdated = await this.giftRepository.save({
      ...gift,
      ...dto,
    });

    return giftUpdated;
  }

  async validateGiftCategorySetupData(giftCategoryId: number) {
    const giftCategory = await this.giftCategoryRepository.findOneBy({
      id: giftCategoryId,
    });

    if (!giftCategory) {
      throw new NotFoundExc('Không tìm thấy danh mục quà!');
    }
  }
}
