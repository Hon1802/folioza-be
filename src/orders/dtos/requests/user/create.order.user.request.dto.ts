import {
  IsValidArrayObject,
  IsValidEnum,
} from '../../../../common/decorators/custom-validator.decorator';
import { OrderDeliveryMethodEnum } from '../../../enums/order.enum';
import { OrderUserRequestDto } from './order.user.request.dto';

export class CreateOrderUserRequestDto {
  @IsValidArrayObject({ minSize: 1 }, OrderUserRequestDto)
  data: OrderUserRequestDto[];

  @IsValidEnum({
    enum: OrderDeliveryMethodEnum,
    required: true,
  })
  deliveryMethod: OrderDeliveryMethodEnum;
}
