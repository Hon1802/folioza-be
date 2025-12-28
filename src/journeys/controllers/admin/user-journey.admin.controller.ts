import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
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
import { GetListUserJourneyAdminRequestDto } from '../../dtos/requests/admin/user-journey.admin.request.dto';
import { UserJourneyAdminResponseDto } from '../../dtos/responses/admin/user-journey.admin.response.dto';
import { UserJourneyAdminService } from '../../services/admin/user-journey.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/user-journeys` })
@ApiTags('Admin User Journeys Controller')
@NeedAdminAuthDecorator()
export class UserJourneyAdminController {
  constructor(
    private readonly userJourneyAdminService: UserJourneyAdminService,
  ) {}

  @Get()
  async getList(@Query() dto: GetListUserJourneyAdminRequestDto) {
    const result = await this.userJourneyAdminService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new UserJourneyAdminResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userJourneyAdminService.getById(id);
    return new AppResponseDto(new UserJourneyAdminResponseDto(result));
  }
}
