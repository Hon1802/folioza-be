import {
  IsValidPhoneNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';

export class LoginUserRequestDto {
  @IsValidPhoneNumber()
  phoneNumber: string;

  // use key instead of password/otp
  @IsValidText()
  key: string;
}
