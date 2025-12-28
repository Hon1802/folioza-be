import { BaseEntityWithoutDeletedAtWithoutVersion } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GiftEntity } from '../../gifts/entities/gift.entity';

@Entity('files')
export class FileEntity extends BaseEntityWithoutDeletedAtWithoutVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'key' })
  key: string;

  @Column({ name: 'bucket' })
  bucket: string;

  @Column({ name: 'url', nullable: true })
  url?: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'size' })
  size: number;

  @OneToMany(() => GiftEntity, (gift) => gift.file)
  gifts: GiftEntity[];
}
