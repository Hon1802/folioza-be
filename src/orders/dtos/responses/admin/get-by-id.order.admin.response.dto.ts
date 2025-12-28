import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { UserJourneyUserResponseDto } from '../../../../journeys/dtos/responses/user/user-journey.user.response.dto';
import { ProfileUserResponseDto } from '../../../../users/dtos/responses/user/profile.user.response.dto';
import {
  OrderDeliveryMethodEnum,
  OrderPaymentMethodEnum,
  OrderStatusEnum,
} from '../../../enums/order.enum';

export class OrderDetailAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  orderId: number;

  @AutoMapDecorator()
  userId: number;

  @AutoMapDecorator()
  userJourneyId?: number;

  @NestedDecorator(() => UserJourneyUserResponseDto)
  userJourney?: UserJourneyUserResponseDto | null;

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

export class GetByIdOrderAdminResponseDto extends BaseMapperDto {
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
  paymentMethod: OrderPaymentMethodEnum | null;

  @AutoMapDecorator()
  deliveryMethod: OrderDeliveryMethodEnum | null;

  @NestedArrayDecorator(() => OrderDetailAdminResponseDto)
  orderDetails?: OrderDetailAdminResponseDto[] | null;

  @AutoMapDecorator()
  orderShipment: any;

  @NestedDecorator(() => ProfileUserResponseDto)
  user?: ProfileUserResponseDto | null;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
