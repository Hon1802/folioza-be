import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { FileAdminController } from './controllers/admin/file.admin.controller';
import { FileRepository } from './repositories/file.repository';
import { FileAdminService } from './services/file.admin.service';

@Module({
  imports: [AuthModule],
  controllers: [FileAdminController],
  providers: [FileAdminService, FileRepository],
})
export class FileModule {}
