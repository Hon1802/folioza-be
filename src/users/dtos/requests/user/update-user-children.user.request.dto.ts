import {
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class UpdateUserChildrenUserRequestDto {
  @IsValidNumber()
  id: number;

  @IsValidText({ required: false })
  name?: string;

  @IsValidNumber({ required: false, min: 1, max: 18 })
  age?: number;

  @IsValidText({ required: false })
  clothingSize?: string;

  @IsValidText({ required: false })
  avatarUrl?: string;
}
