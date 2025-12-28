import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { AdminRoleEnum, AdminStatusEnum } from '../../../enums/admin.enum';

export class ProfileAdminResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  email: string;

  @AutoMapDecorator()
  phoneNumber: string;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  role: AdminRoleEnum;

  @AutoMapDecorator()
  status: AdminStatusEnum;

  @AutoMapDecorator()
  lastLoginAt: Date;

  @AutoMapDecorator()
  createdAt: Date;
}
