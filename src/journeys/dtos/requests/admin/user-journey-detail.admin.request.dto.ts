import { IsValidNumber } from '../../../../common/decorators/custom-validator.decorator';

export class ApproveUserJourneyDetailAdminRequestDto {
  @IsValidNumber({ required: false })
  journeyId?: number;

  @IsValidNumber({ required: false })
  journeyDetailId?: number;

  @IsValidNumber({ required: false })
  userId?: number;
}
