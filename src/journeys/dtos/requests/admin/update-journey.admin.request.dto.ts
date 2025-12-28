import { PartialType } from '@nestjs/swagger';
import { CreateJourneyAdminRequestDto } from './create-journey.admin.request.dto';

export class UpdateJourneyAdminRequestDto extends PartialType(
  CreateJourneyAdminRequestDto,
) {}
