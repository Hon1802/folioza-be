import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
  constructor(dataSource: DataSource) {
    super(OrderEntity, dataSource);
  }
}
