import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { UserJourneyEntity } from '../../journeys/entities/user-journey.entity';
import { OrderEntity } from './order.entity';
import { GiftEntity } from '../../gifts/entities/gift.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'order_details' })
export class OrderDetailEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_journey_id', nullable: true })
  userJourneyId?: number;

  @Column({ name: 'gift_id' })
  giftId: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'gift_snapshot', type: 'jsonb' })
  giftSnapshot: any;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @OneToOne(() => UserJourneyEntity, (userJourney) => userJourney.orderDetail)
  @JoinColumn({ name: 'user_journey_id' })
  userJourney: UserJourneyEntity;

  @ManyToOne(() => GiftEntity, (gift) => gift.orderDetails)
  @JoinColumn({ name: 'gift_id' })
  gift: GiftEntity;

  @ManyToOne(() => UserEntity, (user) => user.orderDetails)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
