import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { OutboxMessage } from '../entities/outbox-message.entity';
import { OutboxMessageStatus } from '../enums/outbox-message.enum';

@Injectable()
export class OutboxMessageRepository extends BaseRepository<OutboxMessage> {
  constructor(dataSource: DataSource) {
    super(OutboxMessage, dataSource);
  }

  async updateStatus(id: number, status: OutboxMessageStatus, response?: any) {
    await this.update(id, {
      status,
      response: JSON.stringify(response),
    });
  }
}
