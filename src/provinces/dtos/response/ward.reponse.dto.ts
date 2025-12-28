import { AutoMapDecorator } from '../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../common/dtos/base-mapper.dto';

export class WardResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  code: string;
}
