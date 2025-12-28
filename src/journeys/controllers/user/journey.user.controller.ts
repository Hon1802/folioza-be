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
import {
  NeedUserAuthDecorator,
  UserAuthenticatedDecorator,
} from '../../../common/decorators/authenticate.decorator';
import {
  AppResponseDto,
  AppResponseWithPaginateDto,
} from '../../../common/dtos/app-response.dto';
import { UserJourneyGetListRequestDto } from '../../dtos/requests/user/user-journey.get-list.request.dto';
import { JourneyUserResponseDto } from '../../dtos/responses/user/journey.user.response.dto';
import { JourneyUserService } from '../../services/user/journey.user.service';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';

@Controller({ version: '1', path: `${Prefix.USER}/journeys` })
@ApiTags('User Journeys Controller')
export class JourneyUserController {
  constructor(private readonly journeyUserService: JourneyUserService) {}

  @Get()
  async getList(@Query() dto: UserJourneyGetListRequestDto) {
    const result = await this.journeyUserService.getList(dto);
    return new AppResponseWithPaginateDto(
      result.data.map((item) => new JourneyUserResponseDto(item)),
      result.pagination,
    );
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.journeyUserService.getById(id);
    return new AppResponseDto(new JourneyUserResponseDto(result));
  }

  @NeedUserAuthDecorator()
  @Post(':id/start')
  async start(
    @UserAuthenticatedDecorator() user: UserAuthenticatedInterface,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.journeyUserService.start(user, id);
    return new AppResponseDto(result);
  }
}
