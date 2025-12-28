import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';

export class UserChildrenResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  age: number;

  @AutoMapDecorator()
  clothingSize: string;

  @AutoMapDecorator()
  avatarUrl: string;
}
