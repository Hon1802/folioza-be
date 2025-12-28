import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';

export class LoginAdminRequestDto {
  @IsValidText()
  email: string;

  @IsValidText()
  password: string;
}
