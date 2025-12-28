import {
  IsValidEnum,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';
import { GiftStatusEnum, GiftTypeEnum } from '../../../enums/gift.enum';

export class GetListGiftAdminRequestDto extends PaginateRequestDto {
  @IsValidText({
    required: false,
  })
  name?: string;

  @IsValidEnum({
    enum: GiftStatusEnum,
    required: false,
  })
  status?: GiftStatusEnum;

  @IsValidEnum({
    enum: GiftTypeEnum,
    required: false,
  })
  type?: GiftTypeEnum;
}
