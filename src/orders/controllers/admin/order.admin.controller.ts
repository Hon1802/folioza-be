import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';

import { NeedAdminAuthDecorator } from '../../../common/decorators/authenticate.decorator';
import { GetListOrderAdminRequestDto } from '../../dtos/requests/admin/order.admin.request.dto';
import { UpdateStatusOrderAdminRequestDto } from '../../dtos/requests/admin/update.order.admin.request.dto';
import { GetByIdOrderAdminResponseDto } from '../../dtos/responses/admin/get-by-id.order.admin.response.dto';
import { OrderAdminResponseDto } from '../../dtos/responses/admin/order.admin.response.dto';
import { OrderAdminService } from '../../services/admin/order.admin.service';
@Controller({ version: '1', path: `${Prefix.ADMIN}/orders` })
@ApiTags('Admin Order Controller')
@NeedAdminAuthDecorator()
export class OrderAdminController {
  constructor(private readonly orderAdminService: OrderAdminService) {}

  @Get()
  async getList(@Query() dto: GetListOrderAdminRequestDto) {
    const result = await this.orderAdminService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new OrderAdminResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const item = await this.orderAdminService.getById(id);
    return new AppResponseDto(new GetByIdOrderAdminResponseDto(item));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusOrderAdminRequestDto,
  ) {
    const updated = await this.orderAdminService.update(dto, id);
    return new AppResponseDto(new OrderAdminResponseDto(updated));
  }
}
