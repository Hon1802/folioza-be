import { ProvinceResponseDto } from 'src/provinces/dtos/response/province.respone.dto';
import { WardResponseDto } from 'src/provinces/dtos/response/ward.reponse.dto';
import {
  AutoMapDecorator,
  NestedArrayDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { UserStatusEnum } from '../../../enums/user.enum';
import { UserChildrenResponseDto } from '../user/user-children.user.response.dto';

export class UserAdminResponseDto extends BaseMapperDto {
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

  @NestedDecorator(() => WardResponseDto)
  ward: WardResponseDto;

  @NestedDecorator(() => ProvinceResponseDto)
  province: ProvinceResponseDto;

  @AutoMapDecorator()
  lastLoginDate: Date;

  @NestedArrayDecorator(() => UserChildrenResponseDto)
  userChildren: UserChildrenResponseDto[];

  @AutoMapDecorator()
  createdAt: Date;

  @AutoMapDecorator()
  updatedAt: Date;
}
