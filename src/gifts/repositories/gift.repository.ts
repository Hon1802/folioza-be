import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { GiftEntity } from '../entities/gift.entity';

@Injectable()
export class GiftRepository extends BaseRepository<GiftEntity> {
  constructor(dataSource: DataSource) {
    super(GiftEntity, dataSource);
  }
}
