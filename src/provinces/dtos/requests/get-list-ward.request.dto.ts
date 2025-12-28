import {
  IsValidNumber,
  IsValidText,
} from '../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../common/dtos/requests/paginate.request.dto';

export class GetListWardRequestDto extends PaginateRequestDto {
  @IsValidNumber()
  provinceId: number;

  @IsValidText({ required: false })
  name?: string;
}
