import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { WardEntity } from '../entities/ward.entity';

@Injectable()
export class WardRepository extends BaseRepository<WardEntity> {
  constructor(dataSource: DataSource) {
    super(WardEntity, dataSource);
  }
}
