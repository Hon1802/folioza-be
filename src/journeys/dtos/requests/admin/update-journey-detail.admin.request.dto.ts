import { PartialType } from '@nestjs/swagger';
import { CreateJourneyDetailAdminRequestDto } from './create-journey-detail.admin.request.dto';

export class UpdateJourneyDetailAdminRequestDto extends PartialType(
  CreateJourneyDetailAdminRequestDto,
) {}
