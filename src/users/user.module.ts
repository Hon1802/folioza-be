import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserAdminController } from './controllers/admin/user.admin.controller';
import { ProfileUserController } from './controllers/user/profile.user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserAdminService } from './services/admin/user.admin.service';
import { ProfileUserService } from './services/user/profile.user.service';

@Module({
  imports: [AuthModule],
  controllers: [ProfileUserController, UserAdminController],
  providers: [ProfileUserService, UserAdminService, UserRepository],
  exports: [],
})
export class UserModule {}
