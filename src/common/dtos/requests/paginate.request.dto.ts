import { IsValidNumber } from '../../decorators/custom-validator.decorator';

export class PaginateRequestDto {
  @IsValidNumber({ required: false, min: 1 })
  page?: number = 1;

  @IsValidNumber({ required: false, min: 1, max: 100 })
  limit?: number = 20;
}
