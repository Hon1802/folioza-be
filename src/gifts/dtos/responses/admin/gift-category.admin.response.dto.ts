import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { GiftCategoryStatusEnum } from '../../../enums/gift-category.enum';

export class GiftCategoryResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  description: string;

  @AutoMapDecorator()
  priority: number;

  @AutoMapDecorator()
  status: GiftCategoryStatusEnum;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
