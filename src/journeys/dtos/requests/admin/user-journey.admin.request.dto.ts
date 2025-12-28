import {
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';

export class GetListUserJourneyAdminRequestDto extends PaginateRequestDto {
  @IsValidNumber({ required: false })
  journeyId?: number;

  @IsValidText({ required: false })
  ticketCode?: string;

  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  phoneNumber?: string;
}
