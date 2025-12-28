import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { GiftCategoryStatusEnum } from '../enums/gift-category.enum';
import { GiftEntity } from './gift.entity';

@Entity({ name: 'gift_categories' })
export class GiftCategoryEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'priority' })
  priority: number;

  @Column({ name: 'status' })
  status: GiftCategoryStatusEnum;

  @OneToMany(() => GiftEntity, (gift) => gift.giftCategory)
  gifts: GiftEntity[];
}
