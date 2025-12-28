import {
  IsValidBoolean,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class CreateJourneyDetailAdminRequestDto {
  @IsValidText()
  name: string;

  @IsValidNumber()
  journeyId: number;

  @IsValidText()
  description: string;

  @IsValidNumber()
  order: number;

  @IsValidBoolean()
  required: boolean;

  @IsValidText({ required: false })
  iconUrl?: string;
}
