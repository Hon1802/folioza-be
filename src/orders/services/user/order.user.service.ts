import { Injectable } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import {
  ConflictExc,
  NotFoundExc,
} from '../../../common/exceptions/custom-http.exception';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { generateRandomTransactionExternalId } from '../../../common/utils/generation.util';
import { LoggerService } from '../../../core';
import { GiftEntity } from '../../../gifts/entities/gift.entity';
import { GiftRepository } from '../../../gifts/repositories/gift.repository';
import { UserEntity } from '../../../users/entities/user.entity';
import { UserRepository } from '../../../users/repositories/user.repository';
import { OrderDetailEntity } from '../../entities/order-detail.entity';
import { OrderEntity } from '../../entities/order.entity';
import {
  OrderDeliveryMethodEnum,
  OrderPaymentMethodEnum,
  OrderStatusEnum,
} from '../../enums/order.enum';
import { CreateOrderUserDataInterface } from '../../interfaces/user/order.user.interface';
import { OrderDetailRepository } from '../../repositories/order-detail.repository';
import { OrderShipmentRepository } from '../../repositories/order-shipment.repository';
import { OrderRepository } from '../../repositories/order.repository';
import { GetListOrderUserRequestDto } from '../../dtos/requests/user/get-list.order.user.request.dto';

@Injectable()
export class OrderUserService {
  private readonly _logger = new LoggerService(OrderUserService.name);

  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderShipmentRepository: OrderShipmentRepository,
    private readonly orderDetailRepository: OrderDetailRepository,
    private readonly userRepository: UserRepository,
    private readonly giftRepository: GiftRepository,
  ) {}

  async getList(
    userAuth: UserAuthenticatedInterface,
    dto: GetListOrderUserRequestDto,
  ) {
    const { page, limit } = dto;

    const queryBuilder = this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'orderDetails')
      .leftJoinAndSelect('orderDetails.userJourney', 'userJourney')
      .leftJoinAndSelect('userJourney.userChild', 'userChild');

    queryBuilder.where('order.userId = :userId', {
      userId: userAuth.id,
    });

    if (dto.status) {
      queryBuilder.andWhere('order.status = :status', {
        status: dto.status,
      });
    }

    queryBuilder.orderBy('order.createdAt', 'DESC');

    const { items, meta } = await paginate(queryBuilder, {
      limit,
      page,
    });

    return {
      data: items,
      pagination: meta,
    };
  }

  async getById(userAuth: UserAuthenticatedInterface, id: number) {
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
      .andWhere('order.userId = :userId', { userId: userAuth.id })
      .getOne();

    if (!order) {
      throw new NotFoundExc('Không tìm thấy đơn hàng!');
    }

    return order;
  }

  async createJourneyOrder(
    user: UserEntity,
    data: CreateOrderUserDataInterface,
    deliveryMethod: OrderDeliveryMethodEnum,
  ) {
    return this.handleCreateOrder(
      user,
      data,
      OrderPaymentMethodEnum.JOURNEY,
      deliveryMethod,
    );
  }

  async getDefaultOrderShipment(userAuth: UserAuthenticatedInterface) {
    const queryBuilder = this.orderShipmentRepository
      .createQueryBuilder('orderShipment')
      .leftJoinAndSelect('orderShipment.ward', 'ward')
      .leftJoinAndSelect('orderShipment.province', 'province')
      .leftJoinAndSelect('orderShipment.order', 'order')
      .where('order.userId = :userId', { userId: userAuth.id })
      .orderBy('orderShipment.createdAt', 'DESC')
      .limit(1);

    const orderShipment = await queryBuilder.getOne();
    return orderShipment;
  }

  @Transactional()
  private async handleCreateOrder(
    user: UserEntity,
    data: CreateOrderUserDataInterface,
    paymentMethod: OrderPaymentMethodEnum,
    deliveryMethod: OrderDeliveryMethodEnum,
  ) {
    // Get gifts with pessimistic lock
    const giftIds = data.data.map((item) => item.giftId);

    if (giftIds.length === 0) {
      throw new ConflictExc('Đơn hàng trống.');
    }

    // Remove duplicate
    const uniqueGiftIds = Array.from(new Set(giftIds));

    const gifts = await this.giftRepository.find({
      where: { id: In(uniqueGiftIds) },
      lock: { mode: 'pessimistic_write' },
    });

    // Validate all gifts exist
    // TODO: Check quantity, ...
    if (gifts.length !== uniqueGiftIds.length) {
      throw new NotFoundExc('Thông tin quà không hợp lệ!');
    }

    // Calculate total amount
    const totalAmount = this.calculateTotalAmountOrder(data, gifts);

    // Create order
    // const orderStatus =
    //   deliveryMethod === OrderDeliveryMethodEnum.DELIVERY
    //     ? OrderStatusEnum.PENDING
    //     : OrderStatusEnum.COMPLETED;
    const order = await this.orderRepository.save({
      code: generateRandomTransactionExternalId(),
      userId: user.id,
      totalAmount,
      paymentMethod,
      status: OrderStatusEnum.PENDING,
      deliveryMethod,
    });

    // Create order details
    await this.handleCreateOrderDetails(order, data, gifts);

    // Create order shipment

    await this.handleCreateOrderShipment(order, data);

    // TODO: Decrease quantity of gifts, ...

    return order;
  }

  private async handleCreateOrderDetails(
    order: OrderEntity,
    data: CreateOrderUserDataInterface,
    giftEntities: GiftEntity[],
  ) {
    const giftMap = new Map(giftEntities.map((gift) => [gift.id, gift]));
    const orderDetails: Partial<OrderDetailEntity>[] = data.data.map((item) => {
      const gift = giftMap.get(item.giftId);
      if (!gift) {
        throw new NotFoundExc(`Không tìm thấy quà tặng ID=${item.giftId}`);
      }
      if (item.quantity <= 0) {
        throw new ConflictExc(
          `Số lượng không hợp lệ cho giftId=${item.giftId}`,
        );
      }

      const giftSnapshot = {
        id: gift.id,
        name: gift.name,
        status: gift.status,
        type: gift.type,
        quantity: gift.quantity,
        price: gift.price,
      };

      return {
        orderId: order.id,
        userId: order.userId,
        userJourneyId: item.userJourneyId,
        giftId: item.giftId,
        quantity: item.quantity,
        price: gift.price,
        totalAmount: gift.price * item.quantity,
        giftSnapshot,
      };
    });

    return await this.orderDetailRepository.insert(orderDetails);
  }

  private async handleCreateOrderShipment(
    order: OrderEntity,
    data: CreateOrderUserDataInterface,
  ) {
    if (order.deliveryMethod === OrderDeliveryMethodEnum.PICKUP) {
      return;
    }

    const { address, wardId, provinceId } = data;
    if (!address || !wardId || !provinceId) {
      throw new NotFoundExc('Thiếu thông tin địa chỉ giao hàng.');
    }
    // create order shipment
    return await this.orderShipmentRepository.insert({
      orderId: order.id,
      address,
      wardId,
      provinceId,
    });
  }

  private calculateTotalAmountOrder(
    data: CreateOrderUserDataInterface,
    giftEntities: GiftEntity[],
  ) {
    let totalAmount = 0;
    const giftMap = new Map(giftEntities.map((gift) => [gift.id, gift]));

    for (const item of data.data) {
      const gift = giftMap.get(item.giftId);
      totalAmount += gift.price * item.quantity;
    }
    return totalAmount;
  }
}
