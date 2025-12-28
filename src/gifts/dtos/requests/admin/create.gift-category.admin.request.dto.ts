import {
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { GiftCategoryStatusEnum } from '../../../enums/gift-category.enum';

export class CreateGiftCategoryAdminRequestDto {
  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidNumber()
  priority: number;

  @IsValidEnum({
    enum: GiftCategoryStatusEnum,
    required: true,
  })
  status: GiftCategoryStatusEnum;
}
