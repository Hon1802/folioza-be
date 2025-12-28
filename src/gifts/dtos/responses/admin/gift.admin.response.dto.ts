import {
  AutoMapDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { GiftStatusEnum, GiftTypeEnum } from '../../../enums/gift.enum';
import { GiftCategoryResponseDto } from './gift-category.admin.response.dto';

export class GiftResponseDto extends BaseMapperDto {
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
  file: any;

  @NestedDecorator(() => GiftCategoryResponseDto)
  giftCategory: GiftCategoryResponseDto;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
