import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { UserAdminResponseDto } from '../../../../users/dtos/responses/admin/user.admin.respone.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';
import { JourneyAdminResponseDto } from './journey.admin.response.dto';
import { UserJourneyDetailAdminResponseDto } from './user-journey-detail.admin.response.dto';

export class UserJourneyAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  userId: number;

  @AutoMapDecorator()
  journeyId: number;

  @AutoMapDecorator()
  ticketCode: string;

  @AutoMapDecorator()
  status: JourneyStatusEnum;

  @NestedArrayDecorator(() => UserJourneyDetailAdminResponseDto)
  userJourneyDetails: UserJourneyDetailAdminResponseDto[];

  @NestedDecorator(() => JourneyAdminResponseDto)
  journey: JourneyAdminResponseDto;

  @NestedDecorator(() => UserAdminResponseDto)
  user: UserAdminResponseDto;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
