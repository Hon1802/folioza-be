import { PartialType } from '@nestjs/mapped-types';
import { CreateWeddingAdminRequestDto } from './create.request.dto';

export class UpdateWeddingAdminRequestDto extends PartialType(
  CreateWeddingAdminRequestDto,
) {}
