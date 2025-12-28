import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { UserChildrenEntity } from '../entities/user-children.entity';

@Injectable()
export class UserChildrenRepository extends BaseRepository<UserChildrenEntity> {
  constructor(dataSource: DataSource) {
    super(UserChildrenEntity, dataSource);
  }
}
