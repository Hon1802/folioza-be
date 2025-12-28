import { IsValidEnum } from '../../../../common/decorators/custom-validator.decorator';
import { OrderStatusEnum } from '../../../enums/order.enum';

export class UpdateStatusOrderAdminRequestDto {
  @IsValidEnum({
    enum: OrderStatusEnum,
  })
  status: OrderStatusEnum;
}
