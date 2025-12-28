import { IsValidText } from '../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../common/dtos/requests/paginate.request.dto';

export class GetListProvinceRequestDto extends PaginateRequestDto {
  @IsValidText({ required: false })
  name?: string;
}
