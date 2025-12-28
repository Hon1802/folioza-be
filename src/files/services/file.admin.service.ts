import { Bucket, GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/core';
import { Transactional } from 'typeorm-transactional';
import { v4 as uuidv4 } from 'uuid';
import { GlobalConfig } from '../../common/configs/global.config';
import { MapFilePathSupport } from '../../common/constants/index.constant';
import { InternalServerErrorExc } from '../../common/exceptions/custom-http.exception';
import { AdminAuthenticatedInterface } from '../../common/interfaces/authenticate.interface';
import { PresignedUrlCommonRequestDto } from '../dtos/requests/common/presigned-url.common.request.dto';
import { GoogleCloudStorageFolderEnum } from '../enums/file.enum';
import { FileRepository } from '../repositories/file.repository';

@Injectable()
export class FileAdminService {
  private readonly _logger = new LoggerService(FileAdminService.name);
  private bucket: Bucket;
  private storage: Storage;

  constructor(
    private readonly fileRepository: FileRepository,
    private readonly configService: ConfigService<GlobalConfig>,
  ) {
    this.storage = new Storage({
      projectId: this.configService.get('storage.projectId'),
      credentials: {
        client_email: this.configService.get('storage.clientEmail'),
        private_key: this.configService.get('storage.privateKey'),
      },
    });
    this.bucket = this.storage.bucket(
      this.configService.get('storage.mediaBucket'),
    );
  }

  @Transactional()
  async createPresignUrl(
    adminAuth: AdminAuthenticatedInterface,
    dto: PresignedUrlCommonRequestDto,
  ) {
    const { type, rootFolder } = dto;

    const fileType = MapFilePathSupport.find((obj) => obj.types.includes(type));
    if (!fileType) throw new InternalServerErrorExc('Loại file không hỗ trợ');

    const fileName = this.genFileName(
      rootFolder,
      fileType.key,
      adminAuth.id,
      type,
    );
    const file = this.bucket.file(fileName);
    const newFile = this.fileRepository.create({
      key: fileName,
      bucket: this.configService.get('storage.mediaBucket'),
      size: 0,
      type: fileType.key,
      url: this.getFileUrl(fileName),
    });

    await this.fileRepository.save(newFile);

    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000,
      contentType: type,
    };
    try {
      const presignedUrl = await file.getSignedUrl(options);

      return {
        presignedUrl,
        file: { ...newFile },
      };
    } catch (error) {
      this._logger.error(error);
      throw new InternalServerErrorExc('Lỗi tạo presign url');
    }
  }

  private genFileName(
    rootFolder: GoogleCloudStorageFolderEnum,
    fileType: string,
    userId: number,
    type: string,
    fileName?: string,
  ) {
    const randomStr = uuidv4();
    if (fileName) {
      return `${rootFolder}/${fileType}/${userId}/${randomStr}/${fileName}.${type}`;
    }
    return `${rootFolder}/${fileType}/${userId}/${randomStr}.${type}`;
  }

  private getFileUrl(key: string) {
    return `https://storage.googleapis.com/${this.configService.get(
      'storage.mediaBucket',
    )}/${key}`;
  }
}
