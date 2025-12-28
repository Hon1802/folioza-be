import {
  AutoMapDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { ProvinceResponseDto } from '../../../../provinces/dtos/response/province.respone.dto';
import { WardResponseDto } from '../../../../provinces/dtos/response/ward.reponse.dto';

export class GetDefaultOrderShipmentUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  address: string;

  @NestedDecorator(() => WardResponseDto)
  ward: WardResponseDto;

  @NestedDecorator(() => ProvinceResponseDto)
  province: ProvinceResponseDto;
}
