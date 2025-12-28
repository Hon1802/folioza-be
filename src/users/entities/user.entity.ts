import { ProvinceEntity } from 'src/provinces/entities/province.entity';
import { WardEntity } from 'src/provinces/entities/ward.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { UserJourneyDetailEntity } from '../../journeys/entities/user-journey-detail.entity';
import { UserJourneyEntity } from '../../journeys/entities/user-journey.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { UserStatusEnum } from '../enums/user.enum';
import { UserChildrenEntity } from './user-children.entity';
import { OrderDetailEntity } from '../../orders/entities/order-detail.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'name', nullable: true })
  name?: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'status' })
  status: UserStatusEnum;

  @Column({ name: 'address', nullable: true })
  address?: string;

  @Column({ name: 'ward_id', nullable: true })
  wardId?: number;

  @Column({ name: 'province_id', nullable: true })
  provinceId?: number;

  @Column({ name: 'last_login_date', nullable: true, type: 'timestamptz' })
  lastLoginDate?: Date;

  @ManyToOne(() => WardEntity, (ward) => ward.users)
  @JoinColumn({ name: 'ward_id' })
  ward: WardEntity;

  @ManyToOne(() => ProvinceEntity, (province) => province.users)
  @JoinColumn({ name: 'province_id' })
  province: ProvinceEntity;

  @OneToMany(() => UserChildrenEntity, (userChildren) => userChildren.user)
  userChildren: UserChildrenEntity[];

  @OneToMany(() => UserJourneyEntity, (userJourney) => userJourney.user)
  userJourneys: UserJourneyEntity[];

  @OneToMany(
    () => UserJourneyDetailEntity,
    (userJourneyDetail) => userJourneyDetail.user,
  )
  userJourneyDetails: UserJourneyDetailEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetailEntity[];
}
