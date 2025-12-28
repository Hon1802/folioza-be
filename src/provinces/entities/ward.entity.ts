import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProvinceEntity } from './province.entity';
import { OrderShipmentEntity } from '../../orders/entities/order-shipment.entity';

@Entity({ name: 'wards' })
export class WardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'province_id' })
  provinceId: number;

  @ManyToOne(() => ProvinceEntity, (province) => province.wards)
  @JoinColumn({ name: 'province_id' })
  province: ProvinceEntity;

  @OneToMany(() => UserEntity, (user) => user.ward)
  users: UserEntity[];

  @OneToMany(() => OrderShipmentEntity, (orderDetail) => orderDetail.ward)
  orderShipments: OrderShipmentEntity[];
}
