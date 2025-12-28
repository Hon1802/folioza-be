import {
  AutoMapDecorator,
  NestedArrayDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { UserAdminResponseDto } from '../../../../users/dtos/responses/admin/user.admin.respone.dto';
import {
  OrderDeliveryMethodEnum,
  OrderStatusEnum,
} from '../../../enums/order.enum';

export class OrderDetailAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  userId: number;

  @AutoMapDecorator()
  orderId: number;

  @AutoMapDecorator()
  giftId: number;

  @AutoMapDecorator()
  quantity: number;

  @AutoMapDecorator()
  price: number;

  @AutoMapDecorator()
  totalAmount: number;

  @AutoMapDecorator()
  giftSnapshot: any;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}

// Đơn hàng của Admin
export class OrderAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  code: string;

  @AutoMapDecorator()
  userId: number;

  @AutoMapDecorator()
  status: OrderStatusEnum;

  @AutoMapDecorator()
  totalAmount: number;

  @AutoMapDecorator()
  deliveryMethod: OrderDeliveryMethodEnum;

  @AutoMapDecorator()
  recipientSnapshot: any;

  @NestedArrayDecorator(() => OrderDetailAdminResponseDto)
  orderDetails: OrderDetailAdminResponseDto[];

  @AutoMapDecorator()
  user: UserAdminResponseDto;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
