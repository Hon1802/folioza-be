import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';

export class JourneyDetailAdminResponseDto extends BaseMapperDto {
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
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;

  @AutoMapDecorator()
  iconUrl: string;

  @AutoMapDecorator()
  required: boolean;
}
