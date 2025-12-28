import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prefix } from '../../../common/constants/index.constant';
import {
  AdminAuthenticatedDecorator,
  NeedAdminAuthDecorator,
} from '../../../common/decorators/authenticate.decorator';
import { AppResponseDto } from '../../../common/dtos/app-response.dto';
import { AdminAuthenticatedInterface } from '../../../common/interfaces/authenticate.interface';
import { PresignedUrlCommonRequestDto } from '../../dtos/requests/common/presigned-url.common.request.dto';
import { FileAdminService } from '../../services/file.admin.service';

@Controller({ version: '1', path: `${Prefix.ADMIN}/file` })
@ApiTags('File Admin Controller')
@NeedAdminAuthDecorator()
export class FileAdminController {
  constructor(private readonly fileAdminService: FileAdminService) {}

  @NeedAdminAuthDecorator()
  @Post('presign-url')
  async createPresignUrl(
    @AdminAuthenticatedDecorator() adminAuth: AdminAuthenticatedInterface,
    @Body() dto: PresignedUrlCommonRequestDto,
  ) {
    const result = await this.fileAdminService.createPresignUrl(adminAuth, dto);
    return new AppResponseDto(result);
  }
}
