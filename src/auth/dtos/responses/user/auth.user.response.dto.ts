import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';

export class BaseAuthUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  accessToken: string;

  @AutoMapDecorator()
  refreshToken: string;
}
