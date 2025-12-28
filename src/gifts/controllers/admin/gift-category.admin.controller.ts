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
import { NeedAdminAuthDecorator } from '../../../common/decorators/authenticate.decorator';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';
import { CreateGiftCategoryAdminRequestDto } from '../../dtos/requests/admin/create.gift-category.admin.request.dto';
import { GetListGiftCategoryAdminRequestDto } from '../../dtos/requests/admin/get-list.gift-category.admin.request.dto';
import { UpdateGiftCategoryAdminRequestDto } from '../../dtos/requests/admin/update.gift-category.admin.request.dto';
import { GiftCategoryResponseDto } from '../../dtos/responses/admin/gift-category.admin.response.dto';
import { GiftCategoryAdminService } from '../../services/admin/gift-category.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/gift-categories` })
@ApiTags('Admin Gift Categories Controller')
@NeedAdminAuthDecorator()
export class GiftCategoryAdminController {
  constructor(private readonly giftCategoryService: GiftCategoryAdminService) {}

  @Get()
  async getList(@Query() dto: GetListGiftCategoryAdminRequestDto) {
    const result = await this.giftCategoryService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new GiftCategoryResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.giftCategoryService.getById(id);
    return new AppResponseDto(new GiftCategoryResponseDto(result));
  }

  @Post()
  async create(@Body() dto: CreateGiftCategoryAdminRequestDto) {
    const result = await this.giftCategoryService.create(dto);
    return new AppResponseDto(new GiftCategoryResponseDto(result));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGiftCategoryAdminRequestDto,
  ) {
    const result = await this.giftCategoryService.update(dto, id);
    return new AppResponseDto(new GiftCategoryResponseDto(result));
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.giftCategoryService.deleteById(id);
    return new AppResponseDto(result);
  }
}
