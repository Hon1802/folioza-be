import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { OrderDetailEntity } from '../entities/order-detail.entity';

@Injectable()
export class OrderDetailRepository extends BaseRepository<OrderDetailEntity> {
  constructor(dataSource: DataSource) {
    super(OrderDetailEntity, dataSource);
  }
}
