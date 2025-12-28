import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';

@Entity({ name: 'weddings' })
export class WeddingEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', name: 'themes' })
  themes: any;

  @Column({ type: 'jsonb', name: 'wedding_objects' })
  weddingObjects: any[];
}
