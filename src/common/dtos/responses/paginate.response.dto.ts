import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class PaginationResponseDto {
  currentPage: number;
  last: boolean;
  recordsPerPage: number;
  totalPages: number;
  totalRecords: number;

  constructor(meta: IPaginationMeta) {
    this.totalRecords = meta.totalItems;
    this.currentPage = meta.currentPage;
    this.recordsPerPage = meta.itemsPerPage;
    this.totalPages = meta.totalPages;
    this.last = meta.currentPage === meta.totalPages;
  }
}
