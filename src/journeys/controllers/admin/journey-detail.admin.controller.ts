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
import { CreateJourneyDetailAdminRequestDto } from '../../dtos/requests/admin/create-journey-detail.admin.request.dto';
import { GetListJourneyDetailAdminRequestDto } from '../../dtos/requests/admin/get-list-journey-detail.admin.request.dto';
import { UpdateJourneyDetailAdminRequestDto } from '../../dtos/requests/admin/update-journey-detail.admin.request.dto';
import { JourneyDetailAdminResponseDto } from '../../dtos/responses/admin/journey-detail.admin.response.dto';
import { JourneyDetailAdminService } from '../../services/admin/journey-detail.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/journey-details` })
@ApiTags('Admin Journey Details Controller')
@NeedAdminAuthDecorator()
export class JourneyDetailAdminController {
  constructor(
    private readonly journeyDetailService: JourneyDetailAdminService,
  ) {}

  @Get()
  async getList(@Query() dto: GetListJourneyDetailAdminRequestDto) {
    const result = await this.journeyDetailService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new JourneyDetailAdminResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.journeyDetailService.getById(id);
    return new AppResponseDto(new JourneyDetailAdminResponseDto(result));
  }

  @Post()
  async create(@Body() dto: CreateJourneyDetailAdminRequestDto) {
    const result = await this.journeyDetailService.create(dto);
    return new AppResponseDto(new JourneyDetailAdminResponseDto(result));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJourneyDetailAdminRequestDto,
  ) {
    const result = await this.journeyDetailService.update(dto, id);
    return new AppResponseDto(new JourneyDetailAdminResponseDto(result));
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.journeyDetailService.deleteById(id);
    return new AppResponseDto(result);
  }
}
