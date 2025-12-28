import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { ProvinceEntity } from '../entities/province.entity';

@Injectable()
export class ProvinceRepository extends BaseRepository<ProvinceEntity> {
  constructor(dataSource: DataSource) {
    super(ProvinceEntity, dataSource);
  }
}
