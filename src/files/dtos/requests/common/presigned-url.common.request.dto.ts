import { IsValidEnum } from '../../../../common/decorators/custom-validator.decorator';
import { SupportFileType } from '../../../../common/enums/file.enum';
import { GoogleCloudStorageFolderEnum } from '../../../enums/file.enum';

export class PresignedUrlCommonRequestDto {
  @IsValidEnum({
    enum: SupportFileType,
  })
  type: SupportFileType;

  @IsValidEnum({
    enum: GoogleCloudStorageFolderEnum,
  })
  rootFolder: GoogleCloudStorageFolderEnum;
}
