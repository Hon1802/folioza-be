import {
  IsValidArrayNumber,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { OrderDeliveryMethodEnum } from '../../../../orders/enums/order.enum';

export class UserJourneyConfirmRewardRequestDto {
  @IsValidArrayNumber({ required: true })
  userJourneyIds: number[];

  @IsValidEnum({ enum: OrderDeliveryMethodEnum, required: true })
  deliveryMethod: OrderDeliveryMethodEnum;

  @IsValidText({ required: false })
  address?: string;

  @IsValidNumber({ required: false })
  wardId?: number;

  @IsValidNumber({ required: false })
  provinceId?: number;
}
