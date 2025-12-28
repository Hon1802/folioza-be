import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IsValidDate } from '../../../common/decorators/custom-validator.decorator';
import { FamilyOrder, WeddingRole } from '../../interfaces/wedding.interface';

export class WeddingPersonDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  fatherName?: string;

  @IsOptional()
  @IsString()
  motherName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(WeddingRole)
  role: WeddingRole;

  @IsOptional()
  @IsEnum(FamilyOrder)
  familyOrder?: FamilyOrder;

  @IsValidDate()
  dateOfNegative?: Date;

  @IsValidDate()
  dateOfPositive?: Date;
}
