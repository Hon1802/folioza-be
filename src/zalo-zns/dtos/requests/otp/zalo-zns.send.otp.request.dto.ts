import {
  IsValidEnum,
  IsValidPhoneNumber,
} from '../../../../common/decorators/custom-validator.decorator';
import { SendZnsSource } from '../../../enums/zalo-zns.enum';

export class ZaloZnsSendOtpRequestDto {
  @IsValidPhoneNumber()
  phoneNumber: string;

  @IsValidEnum({ enum: SendZnsSource, required: true })
  source: SendZnsSource;
}
