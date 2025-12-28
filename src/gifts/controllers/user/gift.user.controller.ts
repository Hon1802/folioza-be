import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';
import { GetListGiftActiveReqDto } from '../../dtos/requests/user/gift.user.request.dto';
import { GiftUserResponseDto } from '../../dtos/responses/user/gift.user.response.dto';
import { GiftUserService } from '../../services/user/gift.user.service';

@Controller({ version: '1', path: `${Prefix.USER}/gifts` })
@ApiTags('User Gift Controller')
export class GiftUserController {
  constructor(private readonly giftUserService: GiftUserService) {}

  @Get()
  async getListActive(@Query() dto: GetListGiftActiveReqDto) {
    const result = await this.giftUserService.getActive(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new GiftUserResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const item = await this.giftUserService.getById(id);
    return new AppResponseDto(new GiftUserResponseDto(item));
  }
}
