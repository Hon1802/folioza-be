import { IsValidEnum } from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';
import { OrderStatusEnum } from '../../../enums/order.enum';

export class GetListOrderUserRequestDto extends PaginateRequestDto {
  @IsValidEnum({
    enum: OrderStatusEnum,
    required: false,
  })
  status?: OrderStatusEnum;
}
