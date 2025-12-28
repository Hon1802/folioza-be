import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { GiftStatusEnum, GiftTypeEnum } from '../../../enums/gift.enum';

export class CreateGiftAdminRequestDto {
  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidEnum({
    enum: GiftStatusEnum,
    required: true,
  })
  status: GiftStatusEnum;

  @IsValidEnum({
    enum: GiftTypeEnum,
    required: true,
  })
  type: GiftTypeEnum;

  @IsValidNumber()
  priority: number;

  @IsValidNumber()
  quantity: number;

  @IsValidNumber()
  price: number;

  @IsValidNumber()
  giftCategoryId: number;

  @IsValidNumber({ required: false })
  fileId?: number;
}
