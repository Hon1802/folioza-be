import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';

export class GetListUserAdminRequestDto extends PaginateRequestDto {
  @IsValidText({ required: false })
  phoneNumber?: string;

  @IsValidText({ required: false })
  name?: string;
}
