import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import {
  OrderDeliveryMethodEnum,
  OrderPaymentMethodEnum,
  OrderStatusEnum,
} from '../enums/order.enum';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderShipmentEntity } from './order-shipment.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'status' })
  status: OrderStatusEnum;

  @Column({ name: 'total_amount' })
  totalAmount: number;

  @Column({ name: 'payment_method' })
  paymentMethod: OrderPaymentMethodEnum;

  @Column({ name: 'delivery_method' })
  deliveryMethod: OrderDeliveryMethodEnum;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => OrderShipmentEntity, (orderShipment) => orderShipment.order)
  orderShipment: OrderShipmentEntity[];
}
