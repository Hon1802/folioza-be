import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../common/repositories/base.repository';
import { FileEntity } from '../entities/file.entity';

@Injectable()
export class FileRepository extends BaseRepository<FileEntity> {
  constructor(dataSource: DataSource) {
    super(FileEntity, dataSource);
  }
}
