import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntityOnlyCreatedAt } from '../../common/entities/base.entity';
import {
  CallType,
  OutboxMessageStatus,
  OutboxMessageType,
  SyncProvider,
  SyncType,
} from '../enums/outbox-message.enum';

@Entity({ name: 'outbox_messages' })
export class OutboxMessage extends BaseEntityOnlyCreatedAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SyncProvider })
  provider: SyncProvider;

  @Column({ name: 'call_type', type: 'enum', enum: CallType })
  callType: CallType;

  @Column({ name: 'sync_type', type: 'enum', enum: SyncType })
  syncType: SyncType;

  @Column()
  request: string;

  @Column()
  response: string;

  @Column({ name: 'retry_number' })
  retryNumber: number;

  @Column({ type: 'enum', enum: OutboxMessageStatus })
  status: OutboxMessageStatus;

  @Column({ nullable: true })
  type: OutboxMessageType;
}
