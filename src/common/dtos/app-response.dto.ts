import { IPaginationMeta } from 'nestjs-typeorm-paginate';
import { PaginationResponseDto } from './responses/paginate.response.dto';

export class AppResponseDto {
  data?: any;

  constructor(data: any) {
    this.data = typeof data === 'undefined' ? null : data;
  }
}

export class AppResponseWithPaginateDto extends AppResponseDto {
  pagination?: PaginationResponseDto;

  constructor(data: any, meta: IPaginationMeta) {
    super(data);
    this.pagination = new PaginationResponseDto(meta);
  }
}
