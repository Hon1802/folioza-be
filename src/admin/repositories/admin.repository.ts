import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { getNowAtTimezone } from '../../common/utils/datetime.util';
import { AdminEntity } from '../entities/admin.entity';
import { AdminRoleEnum, AdminStatusEnum } from '../enums/admin.enum';

@Injectable()
export class AdminRepository extends BaseRepository<AdminEntity> {
  constructor(dataSource: DataSource) {
    super(AdminEntity, dataSource);
  }

  async findByIdAndActive(id: number): Promise<AdminEntity | null> {
    return this.findOne({
      where: { id, status: AdminStatusEnum.ACTIVE },
    });
  }

  async findByEmail(email: string): Promise<AdminEntity | null> {
    return this.findOne({
      where: { email },
    });
  }

  async updateLastLogin(adminId: number): Promise<void> {
    await this.update(adminId, {
      lastLoginDate: getNowAtTimezone(),
    });
  }

  async isSuperAdmin(adminId: number): Promise<boolean> {
    const admin = await this.findOne({
      where: { id: adminId },
    });

    return admin?.role === AdminRoleEnum.SUPER_ADMIN;
  }
}
