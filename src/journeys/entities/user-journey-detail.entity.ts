import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminEntity } from '../../admin/entities/admin.entity';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserJourneyDetailStatusEnum } from '../enums/user-journey-detail.enum';
import { JourneyDetailEntity } from './journey-detail.entity';
import { UserJourneyEntity } from './user-journey.entity';
import { JourneyEntity } from './journey.entity';
import { UserChildrenEntity } from 'src/users/entities/user-children.entity';

@Entity({ name: 'user_journey_details' })
export class UserJourneyDetailEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journey_detail_id' })
  journeyDetailId: number;

  @Column({ name: 'user_journey_id' })
  userJourneyId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'user_child_id' })
  userChildId: number;

  @Column({ name: 'status' })
  status: UserJourneyDetailStatusEnum;

  @Column({ name: 'verified_by_admin_id', nullable: true })
  verifiedByAdminId?: number;

  @Column({ name: 'verified_date', nullable: true, type: 'timestamptz' })
  verifiedDate?: Date;

  @ManyToOne(
    () => JourneyDetailEntity,
    (journeyDetail) => journeyDetail.userJourneyDetails,
  )
  @JoinColumn({ name: 'journey_detail_id' })
  journeyDetail: JourneyDetailEntity;

  @ManyToOne(
    () => UserJourneyEntity,
    (userJourney) => userJourney.userJourneyDetails,
  )
  @JoinColumn({ name: 'user_journey_id' })
  userJourney: UserJourneyEntity;

  @ManyToOne(() => UserEntity, (user) => user.userJourneyDetails)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => UserChildrenEntity,
    (userChild) => userChild.userJourneyDetails,
  )
  @JoinColumn({ name: 'user_child_id' })
  userChild: UserChildrenEntity;

  @ManyToOne(() => AdminEntity, (admin) => admin.userJourneyDetails)
  @JoinColumn({ name: 'verified_by_admin_id' })
  verifiedByAdmin: AdminEntity;
}
