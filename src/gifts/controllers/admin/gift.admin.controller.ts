import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';
import { GiftResponseDto } from '../../../gifts/dtos/responses/admin/gift.admin.response.dto';
import { GiftAdminService } from '../../../gifts/services/admin/gift.admin.service';
import { GetListGiftAdminRequestDto } from '../../dtos/requests/admin/get-list.gift.admin.request.dto';
import { CreateGiftAdminRequestDto } from '../../dtos/requests/admin/create.gift.admin.request.dto';
import { UpdateGiftAdminRequestDto } from '../../dtos/requests/admin/update.gift.admin.request.dto';

@Controller({ version: '1', path: `${Prefix.ADMIN}/gifts` })
@ApiTags('Admin Gift Controller')
export class GiftAdminController {
  constructor(private readonly giftService: GiftAdminService) {}

  @Get()
  async getList(@Query() dto: GetListGiftAdminRequestDto) {
    const result = await this.giftService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new GiftResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.giftService.getById(id);
    return new AppResponseDto(new GiftResponseDto(result));
  }

  @Post()
  async create(@Body() dto: CreateGiftAdminRequestDto) {
    const result = await this.giftService.create(dto);
    return new AppResponseDto(new GiftResponseDto(result));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGiftAdminRequestDto,
  ) {
    const result = await this.giftService.update(dto, id);
    return new AppResponseDto(new GiftResponseDto(result));
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.giftService.deleteById(id);
    return new AppResponseDto(result);
  }
}
