import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  NeedUserAuthDecorator,
  UserAuthenticatedDecorator,
} from '../../../common/decorators/authenticate.decorator';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { UpdateUserProfileRequestDto } from '../../dtos/requests/user/update-profile.user.request.dto';
import { ProfileUserResponseDto } from '../../dtos/responses/user/profile.user.response.dto';
import { ProfileUserService } from '../../services/user/profile.user.service';

@Controller({ version: '1', path: `${Prefix.USER}/profile` })
@ApiTags('Profile User Controller')
@NeedUserAuthDecorator()
export class ProfileUserController {
  constructor(private readonly profileUserService: ProfileUserService) {}

  @Get()
  async getProfile(
    @UserAuthenticatedDecorator() user: UserAuthenticatedInterface,
  ) {
    return new AppResponseDto(
      new ProfileUserResponseDto(
        await this.profileUserService.getProfile(user),
      ),
    );
  }

  @Patch()
  async update(
    @UserAuthenticatedDecorator() user: UserAuthenticatedInterface,
    @Body() dto: UpdateUserProfileRequestDto,
  ) {
    return new AppResponseDto(
      new ProfileUserResponseDto(
        await this.profileUserService.update(user, dto),
      ),
    );
  }
}
