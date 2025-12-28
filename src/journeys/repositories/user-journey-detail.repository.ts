import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { UserJourneyDetailEntity } from '../entities/user-journey-detail.entity';

@Injectable()
export class UserJourneyDetailRepository extends BaseRepository<UserJourneyDetailEntity> {
  constructor(dataSource: DataSource) {
    super(UserJourneyDetailEntity, dataSource);
  }
}
