import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { SystemConfig } from '../entities/system-config.entity';
import { SystemConfigTypeEnum } from '../enums/system-config.enum';
import {
  VGSConfigInterface,
  ZMAConfigInterface,
} from '../interfaces/system-config.interface';

@Injectable()
export class SystemConfigRepository extends BaseRepository<SystemConfig> {
  constructor(dataSource: DataSource) {
    super(SystemConfig, dataSource);
  }

  async getZmaConfig(): Promise<ZMAConfigInterface> {
    const zmaConfig = await this.findOne({
      where: { type: SystemConfigTypeEnum.ZMA_CONFIG, isActive: true },
    });

    return zmaConfig as ZMAConfigInterface;
  }

  async getVgsConfig(): Promise<VGSConfigInterface> {
    const vgsConfig = await this.findOne({
      where: { type: SystemConfigTypeEnum.VGS_CONFIG, isActive: true },
    });

    return vgsConfig as VGSConfigInterface;
  }
}
