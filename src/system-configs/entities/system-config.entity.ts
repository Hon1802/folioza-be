import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { SystemConfigTypeEnum } from '../enums/system-config.enum';

@Entity({ name: 'system_configs' })
export class SystemConfig extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'type', type: 'text', unique: true })
  type: SystemConfigTypeEnum;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'data', type: 'jsonb' })
  data: Record<string, any>;
}
