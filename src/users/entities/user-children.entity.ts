import { UserJourneyDetailEntity } from 'src/journeys/entities/user-journey-detail.entity';
import { UserJourneyEntity } from 'src/journeys/entities/user-journey.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'user_children' })
export class UserChildrenEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({ name: 'clothing_size' })
  clothingSize: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @ManyToOne(() => UserEntity, (user) => user.userChildren)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => UserJourneyEntity, (userJourney) => userJourney.userChild)
  userJourneys: UserJourneyEntity[];

  @OneToMany(
    () => UserJourneyDetailEntity,
    (userJourneyDetail) => userJourneyDetail.userChild,
  )
  userJourneyDetails: UserJourneyDetailEntity[];
}
