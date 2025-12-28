import { AutoMapDecorator } from '../../../../common/decorators/automap.decorator';
import { BaseMapperDto } from '../../../../common/dtos/base-mapper.dto';
import { JourneyStatusEnum } from '../../../enums/journey.enum';

export class UserJourneyDetailUserResponseDto extends BaseMapperDto {
  @AutoMapDecorator()
  id: number;

  @AutoMapDecorator()
  journeyDetailId: number;

  @AutoMapDecorator()
  status: JourneyStatusEnum;

  @AutoMapDecorator()
  verifiedDate: Date;
}
