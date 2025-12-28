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
import { CreateJourneyAdminRequestDto } from '../../dtos/requests/admin/create-journey.admin.request.dto';
import { GetListJourneyAdminRequestDto } from '../../dtos/requests/admin/get-list-journey.admin.request.dto';
import { UpdateJourneyAdminRequestDto } from '../../dtos/requests/admin/update-journey.admin.request.dto';
import { JourneyAdminResponseDto } from '../../dtos/responses/admin/journey.admin.response.dto';
import { JourneyAdminService } from '../../services/admin/journey.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/journeys` })
@ApiTags('Admin Journeys Controller')
@NeedAdminAuthDecorator()
export class JourneyAdminController {
  constructor(private readonly journeyService: JourneyAdminService) {}

  @Get()
  async getList(@Query() dto: GetListJourneyAdminRequestDto) {
    const result = await this.journeyService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new JourneyAdminResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.journeyService.getById(id);
    return new AppResponseDto(new JourneyAdminResponseDto(result));
  }

  @Post()
  async create(@Body() dto: CreateJourneyAdminRequestDto) {
    const result = await this.journeyService.create(dto);
    return new AppResponseDto(new JourneyAdminResponseDto(result));
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateJourneyAdminRequestDto,
  ) {
    const result = await this.journeyService.update(dto, id);
    return new AppResponseDto(new JourneyAdminResponseDto(result));
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.journeyService.deleteById(id);
    return new AppResponseDto(result);
  }
}
