import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  AdminAuthenticatedDecorator,
  NeedAdminAuthDecorator,
} from '../../../common/decorators/authenticate.decorator';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { AdminAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { ProfileAdminResponseDto } from '../../dtos/responses/admin/profile.admin.response.dto';
import { ProfileAdminService } from '../../services/admin/profile.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/profile` })
@ApiTags('Profile Admin Controller')
@NeedAdminAuthDecorator()
export class ProfileAdminController {
  constructor(private profileAdminService: ProfileAdminService) {}

  @Get()
  async getProfile(
    @AdminAuthenticatedDecorator() admin: AdminAuthenticatedInterface,
  ) {
    const result = await this.profileAdminService.getProfile(admin);
    return new AppResponseDto(new ProfileAdminResponseDto(result));
  }
}
