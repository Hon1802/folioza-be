import {
  IsValidEnum,
  IsValidPhoneNumber,
  IsValidText,
} from '../../../../common/decorators/custom-validator.decorator';
import { SendZnsSource } from '../../../enums/zalo-zns.enum';

export class ZaloZnsVerifyOtpRequestDto {
  @IsValidPhoneNumber()
  phoneNumber: string;

  @IsValidEnum({ enum: SendZnsSource, required: true })
  source: SendZnsSource;

  @IsValidText({ required: true })
  otp: string;
}
