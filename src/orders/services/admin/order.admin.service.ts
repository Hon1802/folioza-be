import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { In } from 'typeorm';
import { NotFoundExc } from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { SocketEventEnum } from '../../../socket/enums/socket-event.enum';
import { SocketService } from '../../../socket/services/socket.service';
import { GetListOrderAdminRequestDto } from '../../dtos/requests/admin/order.admin.request.dto';
import { UpdateStatusOrderAdminRequestDto } from '../../dtos/requests/admin/update.order.admin.request.dto';
import {
  OrderDeliveryMethodEnum,
  OrderStatusEnum,
} from '../../enums/order.enum';
import { OrderRepository } from '../../repositories/order.repository';

@Injectable()
export class OrderAdminService {
  private readonly _logger = new LoggerService(OrderAdminService.name);
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly socketService: SocketService,
  ) {}

  async getList(dto: GetListOrderAdminRequestDto) {
    const { status, deliveryMethod, phoneNumber, page, limit } = dto;

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .select(['order.id']);

    queryBuilder.orderBy('order.id', 'DESC');

    if (status) {
      queryBuilder.andWhere('order.status = :status', {
        status,
      });
    }

    if (deliveryMethod) {
      queryBuilder.andWhere('order.deliveryMethod = :deliveryMethod', {
        deliveryMethod,
      });
    }

    if (phoneNumber) {
      queryBuilder.andWhere('user.phoneNumber ILIKE :phoneNumber', {
        phoneNumber: `%${phoneNumber}%`,
      });
    }

    queryBuilder.orderBy('order.id', 'DESC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    const orderIds = items.map((order) => order.id);

    const ordersWithRelations = await this.orderRepository.find({
      where: { id: In(orderIds) },
      relations: ['orderDetails', 'user'],
      order: { id: 'DESC' },
    });

    return {
      data: ordersWithRelations,
      pagination: meta,
    };
  }

  async getById(id: number) {
    // const order = await this.orderRepository.findOne({
    //   where: { id },
    //   relations: ['orderDetails', 'user'],
    // });
    // return order;
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.orderShipment', 'orderShipment')
      .leftJoinAndSelect('orderShipment.ward', 'ward')
      .leftJoinAndSelect('orderShipment.province', 'province')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.userJourney', 'userJourney')
      .leftJoinAndSelect('userJourney.userChild', 'userChild')
      .where('order.id = :id', { id })
      .getOne();

    if (!order) {
      throw new NotFoundExc('Không tìm thấy đơn hàng!');
    }

    return order;
  }

  async update(dto: UpdateStatusOrderAdminRequestDto, id: number) {
    // function update status
    const { status } = dto;

    const { affected } = await this.orderRepository.update({ id }, dto);
    if (!affected) throw new NotFoundExc('Không tìm thấy đơn hàng!');
    const updatedOrder = await this.orderRepository.findOne({ where: { id } });
    if (
      status === OrderStatusEnum.COMPLETED &&
      updatedOrder.deliveryMethod === OrderDeliveryMethodEnum.PICKUP
    ) {
      this.socketService.emitToUser(
        updatedOrder?.userId,
        SocketEventEnum.UPDATE_ADMIN_ORDER,
        updatedOrder,
      );
    }
    return await this.getById(id);
  }
}
