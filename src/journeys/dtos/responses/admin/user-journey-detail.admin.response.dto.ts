import { AdminAdminResponseDto } from '../../../../admin/dtos/responses/admin/admin.admin.response.dto';
import {
  AutoMapDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { UserChildrenResponseDto } from '../../../../users/dtos/responses/user/user-children.user.response.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';
import { JourneyDetailAdminResponseDto } from './journey-detail.admin.response.dto';

export class UserJourneyDetailAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  journeyDetailId: number;

  @AutoMapDecorator()
  status: JourneyStatusEnum;

  @AutoMapDecorator()
  verifiedDate: Date;

  @NestedDecorator(() => AdminAdminResponseDto)
  verifiedByAdmin: AdminAdminResponseDto;

  @NestedDecorator(() => UserChildrenResponseDto)
  userChild: UserChildrenResponseDto;

  @NestedDecorator(() => JourneyDetailAdminResponseDto)
  journeyDetail: JourneyDetailAdminResponseDto;

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
