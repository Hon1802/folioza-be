import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { GiftCategoryEntity } from '../entities/gift-category.entity';

@Injectable()
export class GiftCategoryRepository extends BaseRepository<GiftCategoryEntity> {
  constructor(dataSource: DataSource) {
    super(GiftCategoryEntity, dataSource);
  }
}
