import { PartialType } from '@nestjs/swagger';
import { CreateGiftCategoryAdminRequestDto } from './create.gift-category.admin.request.dto';

export class UpdateGiftCategoryAdminRequestDto extends PartialType(
  CreateGiftCategoryAdminRequestDto,
) {}
