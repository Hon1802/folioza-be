import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { JourneyEntity } from './journey.entity';
import { UserJourneyDetailEntity } from './user-journey-detail.entity';

@Entity({ name: 'journey_details' })
export class JourneyDetailEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'journey_id' })
  journeyId: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'order' })
  order: number;

  @Column({ name: 'required', default: false })
  required: boolean;

  @Column({ name: 'icon_url', nullable: true })
  iconUrl?: string;

  @ManyToOne(() => JourneyEntity, (journey) => journey.journeyDetails)
  @JoinColumn({ name: 'journey_id' })
  journey: JourneyEntity;

  @OneToMany(
    () => UserJourneyDetailEntity,
    (userJourneyDetail) => userJourneyDetail.journeyDetail,
  )
  userJourneyDetails: UserJourneyDetailEntity[];
}
