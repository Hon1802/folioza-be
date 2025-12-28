import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { JourneyDetailEntity } from '../entities/journey-detail.entity';

@Injectable()
export class JourneyDetailRepository extends BaseRepository<JourneyDetailEntity> {
  constructor(dataSource: DataSource) {
    super(JourneyDetailEntity, dataSource);
  }
}
