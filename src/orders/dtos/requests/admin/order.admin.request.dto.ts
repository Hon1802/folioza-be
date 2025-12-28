import {
  IsValidEnum,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';
import {
  OrderDeliveryMethodEnum,
  OrderStatusEnum,
} from '../../../enums/order.enum';

export class GetListOrderAdminRequestDto extends PaginateRequestDto {
  @IsValidEnum({
    enum: OrderStatusEnum,
    required: false,
  })
  status?: OrderStatusEnum;

  @IsValidEnum({
    enum: OrderDeliveryMethodEnum,
    required: false,
  })
  deliveryMethod?: OrderDeliveryMethodEnum;

  @IsValidText({ required: false })
  phoneNumber: string;
}
