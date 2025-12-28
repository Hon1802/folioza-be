import {
  AutoMapDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { GiftResponseDto } from '../../../../gifts/dtos/responses/admin/gift.admin.response.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';

export class JourneyAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  description: string;

  @AutoMapDecorator()
  status: JourneyStatusEnum;

  @AutoMapDecorator()
  giftId: number;

  @NestedDecorator(() => GiftResponseDto)
  gift: GiftResponseDto;

  @AutoMapDecorator()
  startDate: Date;

  @AutoMapDecorator()
  endDate: Date;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
