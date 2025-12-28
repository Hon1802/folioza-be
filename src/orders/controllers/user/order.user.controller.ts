import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  NeedUserAuthDecorator,
  UserAuthenticatedDecorator,
} from '../../../common/decorators/authenticate.decorator';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { GetListOrderUserRequestDto } from '../../dtos/requests/user/get-list.order.user.request.dto';
import { GetByIdOrderUserResponseDto } from '../../dtos/responses/user/get-by-id.order.user.response.dto';
import { GetDefaultOrderShipmentUserResponseDto } from '../../dtos/responses/user/get-default-order-shipment.user.dto';
import { GetListOrderUserResponseDto } from '../../dtos/responses/user/get-list.order.user.response.dto';
import { OrderUserService } from '../../services/user/order.user.service';

@Controller({ version: '1', path: `${Prefix.USER}/orders` })
@ApiTags('User Order Controller')
@NeedUserAuthDecorator()
export class OrderUserController {
  constructor(private readonly orderUserService: OrderUserService) {}

  @Get()
  async getList(
    @Query() dto: GetListOrderUserRequestDto,
    @UserAuthenticatedDecorator() userAuth: UserAuthenticatedInterface,
  ) {
    const result = await this.orderUserService.getList(userAuth, dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new GetListOrderUserResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @UserAuthenticatedDecorator() userAuth: UserAuthenticatedInterface,
  ) {
    const result = await this.orderUserService.getById(userAuth, id);
    return new AppResponseDto(new GetByIdOrderUserResponseDto(result));
  }

  @Get('order-shipments/default')
  async getDefaultOrderShipment(
    @UserAuthenticatedDecorator() userAuth: UserAuthenticatedInterface,
  ) {
    const result = await this.orderUserService.getDefaultOrderShipment(
      userAuth,
    );
    return new AppResponseDto(
      new GetDefaultOrderShipmentUserResponseDto(result),
    );
  }
}
