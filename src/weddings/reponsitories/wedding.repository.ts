import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { WeddingEntity } from '../entities/wedding.entity';

@Injectable()
export class WeddingRepository extends BaseRepository<WeddingEntity> {
  constructor(dataSource: DataSource) {
    super(WeddingEntity, dataSource);
  }
}
