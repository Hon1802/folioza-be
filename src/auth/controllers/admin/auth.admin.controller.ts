import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { LoginAdminRequestDto } from '../../dtos/requests/admin/auth.admin.request.dto';
import { RefreshTokenRequestDto } from '../../dtos/requests/common/refresh-token.common.request';
import { LoginAdminResponseDto } from '../../dtos/responses/admin/auth.admin.response.dto';
import { RefreshTokenResponseDto } from '../../dtos/responses/common/refresh-token.common.response.dto';
import { AuthAdminService } from '../../services/admin/auth.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/auth` })
@ApiTags('Auth Admin Controller')
export class AuthAdminController {
  constructor(private authAdminService: AuthAdminService) {}

  @Post('login')
  async login(@Body() req: LoginAdminRequestDto) {
    const result = await this.authAdminService.login(req);
    return new AppResponseDto(new LoginAdminResponseDto(result));
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenRequestDto) {
    const result = await this.authAdminService.refreshToken(dto);
    return new AppResponseDto(new RefreshTokenResponseDto(result));
  }
}
