import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { GiftStatusEnum, GiftTypeEnum } from '../../../enums/gift.enum';

export class GiftUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  description: string;

  @AutoMapDecorator()
  status: GiftStatusEnum;

  @AutoMapDecorator()
  type: GiftTypeEnum;

  @AutoMapDecorator()
  priority: number;

  @AutoMapDecorator()
  quantity: number;

  @AutoMapDecorator()
  price: number;

  @AutoMapDecorator()
  giftCategoryId: number;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
