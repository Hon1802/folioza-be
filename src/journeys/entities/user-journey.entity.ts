import { UserChildrenEntity } from 'src/users/entities/user-children.entity';
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
import { OrderDetailEntity } from '../../orders/entities/order-detail.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserJourneyStatusEnum } from '../enums/user-journey.enum';
import { JourneyEntity } from './journey.entity';
import { UserJourneyDetailEntity } from './user-journey-detail.entity';

@Entity({ name: 'user_journeys' })
export class UserJourneyEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journey_id' })
  journeyId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_child_id' })
  userChildId: number;

  @Column({ name: 'ticket_code' })
  ticketCode: string;

  @Column({ name: 'status' })
  status: UserJourneyStatusEnum;

  @ManyToOne(() => JourneyEntity, (journey) => journey.userJourneys)
  @JoinColumn({ name: 'journey_id' })
  journey: JourneyEntity;

  @ManyToOne(() => UserEntity, (user) => user.userJourneys)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => UserChildrenEntity, (userChild) => userChild.userJourneys)
  @JoinColumn({ name: 'user_child_id' })
  userChild: UserChildrenEntity;

  @OneToMany(
    () => UserJourneyDetailEntity,
    (userJourneyDetail) => userJourneyDetail.userJourney,
  )
  userJourneyDetails: UserJourneyDetailEntity[];

  @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.userJourney)
  orderDetail: OrderDetailEntity;
}
