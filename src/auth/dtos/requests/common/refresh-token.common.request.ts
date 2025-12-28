import { IsValidText } from '../../../../common/decorators/custom-validator.decorator';

export class RefreshTokenRequestDto {
  @IsValidText()
  refreshToken: string;
}
