import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  AdminAuthenticatedDecorator,
  NeedAdminAuthDecorator,
} from '../../../common/decorators/authenticate.decorator';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { AdminAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { UserJourneyDetailAdminService } from '../../services/admin/user-journey-detail.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/user-journey-details` })
@ApiTags('Admin User Journey Details Controller')
@NeedAdminAuthDecorator()
export class UserJourneyDetailAdminController {
  constructor(
    private readonly userJourneyAdminService: UserJourneyDetailAdminService,
  ) {}

  @Post(':id/approve')
  async approve(
    @Param('id', ParseIntPipe) userJourneyDetailId: number,
    @AdminAuthenticatedDecorator() admin: AdminAuthenticatedInterface,
  ) {
    const result = await this.userJourneyAdminService.approve(
      userJourneyDetailId,
      admin,
    );
    return new AppResponseDto(result);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) userJourneyDetailId: number) {
    const result = await this.userJourneyAdminService.getById(
      userJourneyDetailId,
    );
    return new AppResponseDto(result);
  }
}
