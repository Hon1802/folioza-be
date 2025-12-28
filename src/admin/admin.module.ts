import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ProfileAdminController } from './controllers/admin/profile.admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { ProfileAdminService } from './services/admin/profile.admin.service';

@Module({
  imports: [AuthModule],
  controllers: [ProfileAdminController],
  providers: [ProfileAdminService, AdminRepository],
  exports: [],
})
export class AdminModule {}
