import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { OrderEntity } from './order.entity';
import { WardEntity } from '../../provinces/entities/ward.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';

@Entity({ name: 'order_shipments' })
export class OrderShipmentEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'ward_id' })
  wardId: number;

  @Column({ name: 'province_id' })
  provinceId: number;

  @OneToOne(() => OrderEntity, (order) => order.orderShipment)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => WardEntity, (order) => order.orderShipments)
  @JoinColumn({ name: 'ward_id' })
  ward: WardEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.orderShipments)
  @JoinColumn({ name: 'province_id' })
  province: ProvinceEntity;
}
