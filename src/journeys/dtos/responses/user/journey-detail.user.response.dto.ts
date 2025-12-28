import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';

export class JourneyDetailUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  description: string;

  @AutoMapDecorator()
  journeyId: number;

  @AutoMapDecorator()
  order: number;

  @AutoMapDecorator()
  required: boolean;

  @AutoMapDecorator()
  iconUrl: string;
}
