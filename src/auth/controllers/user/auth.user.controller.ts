import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserRequestDto } from 'src/auth/dtos/requests/user/login.user.request.dto';
import { RegisterUserRequestDto } from 'src/auth/dtos/requests/user/register.user.request.dto';
import { RegisterUserResponseDto } from 'src/auth/dtos/responses/user/regsiter.user.response.dto';
import { Prefix } from '../../../common/constants/index.constant';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { RefreshTokenRequestDto } from '../../dtos/requests/common/refresh-token.common.request';
import { RefreshTokenResponseDto } from '../../dtos/responses/common/refresh-token.common.response.dto';
import { LoginUserResponseDto } from '../../dtos/responses/user/login.user.response.dto';
import { AuthUserService } from '../../services/user/auth.user.service';

@Controller({ version: '1', path: `${Prefix.USER}/auth` })
@ApiTags('Auth User Controller')
export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  @Post('login')
  async login(@Body() dto: LoginUserRequestDto) {
    const result = await this.authUserService.login(dto);
    return new AppResponseDto(new LoginUserResponseDto(result));
  }

  @Post('register')
  async register(@Body() dto: RegisterUserRequestDto) {
    const result = await this.authUserService.register(dto);
    return new AppResponseDto(new RegisterUserResponseDto(result));
  }

  @Post('refresh-token')
  async refreshToken(@Body() dto: RefreshTokenRequestDto) {
    const result = await this.authUserService.refreshToken(dto);
    return new AppResponseDto(new RefreshTokenResponseDto(result));
  }

  @Get('check-phone-number-exists/:phoneNumber')
  async checkPhoneNumberExists(@Param('phoneNumber') phoneNumber: string) {
    const result = await this.authUserService.checkPhoneNumberExists(
      phoneNumber,
    );
    return new AppResponseDto(result);
  }
}
