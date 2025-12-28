import {
  IsValidEnum,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';
import { GiftCategoryStatusEnum } from '../../../enums/gift-category.enum';

export class GetListGiftCategoryAdminRequestDto extends PaginateRequestDto {
  @IsValidText({
    required: false,
  })
  name?: string;

  @IsValidEnum({
    enum: GiftCategoryStatusEnum,
    required: false,
  })
  status?: GiftCategoryStatusEnum;
}
