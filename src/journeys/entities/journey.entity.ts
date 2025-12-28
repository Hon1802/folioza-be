import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { GiftEntity } from '../../gifts/entities/gift.entity';
import { JourneyStatusEnum } from '../enums/journey.enum';
import { JourneyDetailEntity } from './journey-detail.entity';
import { UserJourneyEntity } from './user-journey.entity';

@Entity({ name: 'journeys' })
export class JourneyEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'status' })
  status: JourneyStatusEnum;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'gift_id' })
  giftId: number;

  @Column({ name: 'background_image_url', nullable: true })
  backgroundImageUrl?: string;

  @ManyToOne(() => GiftEntity, (gift) => gift.journeys)
  @JoinColumn({ name: 'gift_id' })
  gift: GiftEntity;

  @OneToMany(
    () => JourneyDetailEntity,
    (journeyDetail) => journeyDetail.journey,
  )
  journeyDetails: JourneyDetailEntity[];

  @OneToMany(() => UserJourneyEntity, (userJourney) => userJourney.journey)
  userJourneys: UserJourneyEntity[];
}
