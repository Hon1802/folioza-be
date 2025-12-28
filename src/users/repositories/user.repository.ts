import { Injectable } from '@nestjs/common';
import { DataSource, MoreThan } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { getNowAtTimezone } from '../../common/utils/datetime.util';
import { UserEntity } from '../entities/user.entity';
import { UserStatusEnum } from '../enums/user.enum';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource);
  }

  async findByIdAndActive(id: number): Promise<UserEntity | null> {
    return this.findOne({
      where: { id, status: UserStatusEnum.ACTIVE },
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    await this.update(userId, {
      lastLoginDate: getNowAtTimezone(),
    });
  }
}
