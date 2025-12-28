import { IsValidText } from '../../../common/decorators/custom-validator.decorator';

export class UpdateWeddingMusicRequestDto {
  @IsValidText()
  musicUrl?: string;
}
