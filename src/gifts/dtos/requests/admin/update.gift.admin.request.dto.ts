import { PartialType } from '@nestjs/swagger';
import { CreateGiftAdminRequestDto } from './create.gift.admin.request.dto';

export class UpdateGiftAdminRequestDto extends PartialType(
  CreateGiftAdminRequestDto,
) {}
