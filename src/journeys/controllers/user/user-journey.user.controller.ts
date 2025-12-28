import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  NeedUserAuthDecorator,
  UserAuthenticatedDecorator,
} from '../../../common/decorators/authenticate.decorator';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { UserAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { UserJourneyConfirmRewardRequestDto } from '../../dtos/requests/user/user-journey.confirm-reward.request.dto';
import { UserJourneyUserResponseDto } from '../../dtos/responses/user/user-journey.user.response.dto';
import { UserJourneyUserService } from '../../services/user/user-journey.user.service';

@Controller({ version: '1', path: `${Prefix.USER}/user-journeys` })
@ApiTags('User User Journeys Controller')
@NeedUserAuthDecorator()
export class UserJourneyUserController {
  constructor(
    private readonly userJourneyUserService: UserJourneyUserService,
  ) {}

  @Get('by-journey/:journeyId')
  async getByJourneyId(
    @UserAuthenticatedDecorator() userAuth: UserAuthenticatedInterface,
    @Param('journeyId', ParseIntPipe) journeyId: number,
  ) {
    const result = await this.userJourneyUserService.getByJourneyId(
      userAuth,
      journeyId,
    );
    return new AppResponseDto(
      result.map((item) => new UserJourneyUserResponseDto(item)),
    );
  }

  @Post('confirm-reward')
  async userConfirmReward(
    @UserAuthenticatedDecorator() userAuth: UserAuthenticatedInterface,
    @Body() dto: UserJourneyConfirmRewardRequestDto,
  ) {
    const result = await this.userJourneyUserService.confirmReward(
      userAuth,
      dto,
    );
    return new AppResponseDto(result);
  }
}
