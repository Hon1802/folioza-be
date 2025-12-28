import {
  IsValidArrayObject,
  IsValidNumber,
  IsValidPhoneNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

class UserChildrenRequestDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidNumber({ required: false, min: 1, max: 18 })
  age?: number;

  @IsValidText({ required: false })
  clothingSize?: string;

  @IsValidText({ required: false })
  avatarUrl?: string;
}

export class RegisterUserRequestDto {
  @IsValidPhoneNumber()
  phoneNumber: string;

  @IsValidText()
  name: string;

  @IsValidText({ required: false })
  avatarUrl?: string;

  @IsValidArrayObject({ minSize: 1 }, UserChildrenRequestDto)
  userChildren: UserChildrenRequestDto[];

  @IsValidNumber({ required: false })
  wardId?: number;

  @IsValidNumber({ required: false })
  provinceId?: number;

  @IsValidText({ required: false })
  address?: string;
}
