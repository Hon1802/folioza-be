import {
  IsValidArrayObject,
  IsValidNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { UpdateUserChildrenUserRequestDto } from './update-user-children.user.request.dto';

export class UpdateUserProfileRequestDto {
  @IsValidText({ required: false })
  name?: string;

  @IsValidText({ required: false })
  avatarUrl?: string;

  @IsValidText({ required: false })
  address?: string;

  @IsValidNumber({ required: false })
  wardId?: number;

  @IsValidNumber({ required: false })
  provinceId?: number;

  @IsValidArrayObject({ required: false }, UpdateUserChildrenUserRequestDto)
  children?: UpdateUserChildrenUserRequestDto[];
}
