import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { JourneyEntity } from '../../journeys/entities/journey.entity';
import { GiftStatusEnum, GiftTypeEnum } from '../enums/gift.enum';
import { GiftCategoryEntity } from './gift-category.entity';
import { OrderDetailEntity } from '../../orders/entities/order-detail.entity';
import { FileEntity } from '../../files/entities/file.entity';

@Entity({ name: 'gifts' })
export class GiftEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'status' })
  status: GiftStatusEnum;

  @Column({ name: 'type' })
  type: GiftTypeEnum;

  @Column({ name: 'priority' })
  priority: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'gift_category_id' })
  giftCategoryId: number;

  @Column({ name: 'file_id', nullable: true })
  fileId?: number;

  @ManyToOne(() => GiftCategoryEntity, (giftCategory) => giftCategory.gifts)
  @JoinColumn({ name: 'gift_category_id' })
  giftCategory: GiftCategoryEntity;

  @OneToMany(() => JourneyEntity, (journey) => journey.gift)
  journeys: JourneyEntity[];

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.gift)
  orderDetails: OrderDetailEntity[];

  @ManyToOne(() => FileEntity, (file) => file.gifts)
  @JoinColumn({ name: 'file_id' })
  file: FileEntity;
}
