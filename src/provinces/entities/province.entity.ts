import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WardEntity } from './ward.entity';
import { OrderShipmentEntity } from '../../orders/entities/order-shipment.entity';

@Entity({ name: 'provinces' })
export class ProvinceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => WardEntity, (ward) => ward.province)
  wards: WardEntity[];

  @OneToMany(() => UserEntity, (user) => user.province)
  users: UserEntity[];

  @OneToMany(() => OrderShipmentEntity, (orderDetail) => orderDetail.province)
  orderShipments: OrderShipmentEntity[];
}
