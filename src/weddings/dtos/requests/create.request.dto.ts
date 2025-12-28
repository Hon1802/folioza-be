import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { IsValidObject } from '../../../common/decorators/custom-validator.decorator';
import { WeddingPersonDto } from './person.request.dto';
import { WeddingThemeDto } from './themes.request.dto';

export class CreateWeddingAdminRequestDto {
  @IsValidObject({
    object: WeddingThemeDto,
  })
  themes: any;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeddingPersonDto)
  weddingObjects: WeddingPersonDto[];
}
