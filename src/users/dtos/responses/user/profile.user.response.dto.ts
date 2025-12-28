import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { ProvinceResponseDto } from '../../../../provinces/dtos/response/province.respone.dto';
import { WardResponseDto } from '../../../../provinces/dtos/response/ward.reponse.dto';
import { UserStatusEnum } from '../../../enums/user.enum';
import { UserChildrenResponseDto } from './user-children.user.response.dto';

export class ProfileUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  phoneNumber: string;

  @AutoMapDecorator()
  name: string;

  @AutoMapDecorator()
  avatarUrl: string;

  @AutoMapDecorator()
  status: UserStatusEnum;

  @AutoMapDecorator()
  address: string;

  @AutoMapDecorator()
  wardId: number;

  @AutoMapDecorator()
  ward: any;

  @AutoMapDecorator()
  provinceId: number;

  @AutoMapDecorator()
  province: any;

  @AutoMapDecorator()
  lastLoginDate: Date;

  @NestedArrayDecorator(() => UserChildrenResponseDto)
  userChildren: UserChildrenResponseDto[];
}
