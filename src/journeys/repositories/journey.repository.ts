import { Injectable } from '@nestjs/common';
import { DataSource, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { getNowAtTimezone } from '../../common/utils/datetime.util';
import { JourneyEntity } from '../entities/journey.entity';
import { JourneyStatusEnum } from '../enums/journey.enum';

@Injectable()
export class JourneyRepository extends BaseRepository<JourneyEntity> {
  constructor(dataSource: DataSource) {
    super(JourneyEntity, dataSource);
  }

  async findActiveById(id: number): Promise<JourneyEntity | null> {
    return this.findOne({
      where: {
        id,
        status: JourneyStatusEnum.ACTIVE,
        startDate: LessThanOrEqual(getNowAtTimezone()),
        endDate: MoreThanOrEqual(getNowAtTimezone()),
      },
      relations: ['gift'],
    });
  }
}
