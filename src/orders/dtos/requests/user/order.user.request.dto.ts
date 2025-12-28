import { IsValidNumber } from '../../../../common/decorators/custom-validator.decorator';

export class OrderUserRequestDto {
  @IsValidNumber()
  giftId: number;

  @IsValidNumber()
  quantity: number;
}
