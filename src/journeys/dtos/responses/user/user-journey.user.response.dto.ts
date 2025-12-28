import { UserChildrenResponseDto } from 'src/users/dtos/responses/user/user-children.user.response.dto';
import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';
import { UserJourneyDetailUserResponseDto } from './user-journey-detail.user.response.dto';

export class UserJourneyUserResponseDto extends BaseMapperDto {
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

  @NestedArrayDecorator(() => UserJourneyDetailUserResponseDto)
  userJourneyDetails?: UserJourneyDetailUserResponseDto[] | null;

  @NestedDecorator(() => UserChildrenResponseDto)
  userChild?: UserChildrenResponseDto | null;
}
