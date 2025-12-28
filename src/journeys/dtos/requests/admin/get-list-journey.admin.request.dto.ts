import {
  IsValidDate,
  IsValidEnum,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { PaginateRequestDto } from '../../../../common/dtos/requests/paginate.request.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';

export class GetListJourneyAdminRequestDto extends PaginateRequestDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidEnum({ enum: JourneyStatusEnum, required: false })
  status?: JourneyStatusEnum;

  @IsValidDate({ required: false })
  startDate?: Date;

  @IsValidDate({ required: false })
  endDate?: Date;
}
