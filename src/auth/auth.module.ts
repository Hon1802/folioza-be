import { Module } from '@nestjs/common';
import { UserChildrenRepository } from 'src/users/repositories/user-children.repository';
import { AdminRepository } from '../admin/repositories/admin.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { AuthAdminController } from './controllers/admin/auth.admin.controller';
import { AuthUserController } from './controllers/user/auth.user.controller';
import { AuthAdminService } from './services/admin/auth.admin.service';
import { AuthCommonService } from './services/common/auth.common.service';
import { AuthUserService } from './services/user/auth.user.service';

@Module({
  imports: [],
  controllers: [AuthAdminController, AuthUserController],
  providers: [
    AuthCommonService,
    AuthAdminService,
    AuthUserService,
    AdminRepository,
    UserRepository,
    UserChildrenRepository,
  ],
  exports: [
    AuthCommonService,
    AdminRepository,
    UserRepository,
    UserChildrenRepository,
  ],
})
export class AuthModule {}
