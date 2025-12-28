import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../core';
import { GetListGiftActiveReqDto } from '../../dtos/requests/user/gift.user.request.dto';
import { GiftStatusEnum, GiftTypeEnum } from '../../enums/gift.enum';

@Injectable()
export class GiftUserService {
  private readonly _logger = new LoggerService(GiftUserService.name);
  constructor() {}

  async getActive(dto: GetListGiftActiveReqDto) {
    const results = [
      {
        id: 1,
        name: 'test',
        description: 'description',
        status: GiftStatusEnum.ACTIVE,
        type: GiftTypeEnum.PHYSICAL,
        priority: 1,
        quantity: 1,
        price: 1,
        giftCategoryId: 1,
        fileId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'test 2',
        description: 'description 2',
        status: GiftStatusEnum.ACTIVE,
        type: GiftTypeEnum.PHYSICAL,
        priority: 1,
        quantity: 1,
        price: 1,
        giftCategoryId: 1,
        fileId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return {
      data: results,
      pagination: {
        currentPage: 1,
        last: true,
        recordsPerPage: 10,
        totalPages: 1,
        totalRecords: results.length,
        itemCount: results.length,
        itemsPerPage: results.length,
      },
    };
  }

  async getById(id: number) {
    const gift = {
      id: 2,
      name: 'test 2',
      description: 'description 2',
      status: GiftStatusEnum.ACTIVE,
      type: GiftTypeEnum.PHYSICAL,
      priority: 1,
      quantity: 1,
      price: 1,
      giftCategoryId: 1,
      fileId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return gift;
  }
}
