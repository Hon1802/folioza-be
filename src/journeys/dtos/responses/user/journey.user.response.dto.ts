import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { GiftResponseDto } from '../../../../gifts/dtos/responses/admin/gift.admin.response.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';
import { JourneyDetailUserResponseDto } from './journey-detail.user.response.dto';

export class JourneyUserResponseDto extends BaseMapperDto {
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

  @NestedArrayDecorator(() => JourneyDetailUserResponseDto)
  journeyDetails: JourneyDetailUserResponseDto[];

  @AutoMapDecorator()
  startDate: Date;

  @AutoMapDecorator()
  endDate: Date;

  @AutoMapDecorator()
  backgroundImageUrl: string;
}
