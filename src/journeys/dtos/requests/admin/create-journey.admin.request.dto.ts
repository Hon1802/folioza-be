import {
  IsValidDate,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
  IsValidUrl,
} from '../../../../common/decorators/custom-validator.decorator';
import { JourneyStatusEnum } from '../../../enums/journey.enum';

export class CreateJourneyAdminRequestDto {
  @IsValidText()
  name: string;

  @IsValidText()
  description: string;

  @IsValidEnum({ enum: JourneyStatusEnum, required: true })
  status: JourneyStatusEnum;

  @IsValidDate()
  startDate: Date;

  @IsValidDate()
  endDate: Date;

  @IsValidNumber()
  giftId: number;

  @IsValidUrl({ required: false })
  backgroundImageUrl?: string;
}
