import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { UserChildrenResponseDto } from '../../../../users/dtos/responses/user/user-children.user.response.dto';
import {
  OrderDeliveryMethodEnum,
  OrderPaymentMethodEnum,
  OrderStatusEnum,
} from '../../../enums/order.enum';

// user child for list order
export class CustomUserChildResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  age: number;

  @AutoMapDecorator()
  clothingSize: string;
}
// user journey for list order
export class CustomUserJourneyResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  userChildId: number;

  @NestedDecorator(() => CustomUserChildResponseDto)
  userChild: CustomUserChildResponseDto;
}
// order detail for list order
export class CustomOrderDetailUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  orderId: number;

  @AutoMapDecorator()
  userId: number;

  @AutoMapDecorator()
  userJourneyId?: number;

  @AutoMapDecorator()
  giftId: number;

  @NestedDecorator(() => CustomUserJourneyResponseDto)
  userJourney: CustomUserJourneyResponseDto;
}

// Đơn hàng của user
export class GetListOrderUserResponseDto extends BaseMapperDto {
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
  paymentMethod: OrderPaymentMethodEnum;

  @AutoMapDecorator()
  deliveryMethod: OrderDeliveryMethodEnum;

  @NestedArrayDecorator(() => CustomOrderDetailUserResponseDto)
  orderDetails: CustomOrderDetailUserResponseDto[];

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
