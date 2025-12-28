import { AdminAdminResponseDto } from '../../../../admin/dtos/responses/admin/admin.admin.response.dto';
import {
  AutoMapDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';

export class LoginAdminResponseDto extends BaseMapperDto {
  @NestedDecorator(() => AdminAdminResponseDto)
  admin: AdminAdminResponseDto;

  @AutoMapDecorator()
  accessToken: string;

  @AutoMapDecorator()
  refreshToken: string;
}
