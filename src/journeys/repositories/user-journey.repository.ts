import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { UserJourneyEntity } from '../entities/user-journey.entity';

@Injectable()
export class UserJourneyRepository extends BaseRepository<UserJourneyEntity> {
  constructor(dataSource: DataSource) {
    super(UserJourneyEntity, dataSource);
  }
}
