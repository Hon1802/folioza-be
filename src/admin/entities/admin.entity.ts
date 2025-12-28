import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityWithoutDeletedAtWithoutVersion } from '../../common/entities/base.entity';
import { UserJourneyDetailEntity } from '../../journeys/entities/user-journey-detail.entity';
import { AdminRoleEnum, AdminStatusEnum } from '../enums/admin.enum';

@Entity({ name: 'admins' })
export class AdminEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'role' })
  role: AdminRoleEnum;

  @Column({ name: 'status' })
  status: AdminStatusEnum;

  @Column({ name: 'last_login_date', nullable: true, type: 'timestamptz' })
  lastLoginDate?: Date;

  @OneToMany(
    () => UserJourneyDetailEntity,
    (userJourneyDetail) => userJourneyDetail.verifiedByAdmin,
  )
  userJourneyDetails: UserJourneyDetailEntity[];
}
