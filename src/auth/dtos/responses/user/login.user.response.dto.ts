import { NestedDecorator } from '../../../../common/decorators/automap.decorator';
import { ProfileUserResponseDto } from '../../../../users/dtos/responses/user/profile.user.response.dto';
import { BaseAuthUserResponseDto } from './auth.user.response.dto';

export class LoginUserResponseDto extends BaseAuthUserResponseDto {
  @NestedDecorator(() => ProfileUserResponseDto)
  user: ProfileUserResponseDto;
}
