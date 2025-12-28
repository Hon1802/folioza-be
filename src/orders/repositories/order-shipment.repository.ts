import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { OrderShipmentEntity } from '../entities/order-shipment.entity';

@Injectable()
export class OrderShipmentRepository extends BaseRepository<OrderShipmentEntity> {
  constructor(dataSource: DataSource) {
    super(OrderShipmentEntity, dataSource);
  }
}
