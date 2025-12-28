import {
  AutoMapDecorator,
  NestedDecorator,
} from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { ProvinceResponseDto } from '../../../../provinces/dtos/response/province.respone.dto';
import { WardResponseDto } from '../../../../provinces/dtos/response/ward.reponse.dto';

export class OrderShipmentUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  orderId: number;

  @AutoMapDecorator()
  address: string;

  @AutoMapDecorator()
  userJourneyId?: number;

  @AutoMapDecorator()
  wardId: number;

  @AutoMapDecorator()
  provinceId: number;

  @NestedDecorator(() => WardResponseDto)
  ward?: WardResponseDto | null;

  @NestedDecorator(() => ProvinceResponseDto)
  province?: ProvinceResponseDto | null;
}
