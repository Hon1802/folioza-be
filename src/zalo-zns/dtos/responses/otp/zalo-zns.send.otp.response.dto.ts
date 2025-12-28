import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { OtpStatusEnum } from '../../../enums/otp.enum';

export class ZaloZnsSendOtpResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  status: OtpStatusEnum;

  @AutoMapDecorator()
  ttl: number;
}
