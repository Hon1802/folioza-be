import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GiftCategoryAdminController } from './controllers/admin/gift-category.admin.controller';
import { GiftAdminController } from './controllers/admin/gift.admin.controller';
import { GiftUserController } from './controllers/user/gift.user.controller';
import { GiftCategoryRepository } from './repositories/gift-category.repository';
import { GiftRepository } from './repositories/gift.repository';
import { GiftCategoryAdminService } from './services/admin/gift-category.admin.service';
import { GiftAdminService } from './services/admin/gift.admin.service';
import { GiftUserService } from './services/user/gift.user.service';

@Module({
  imports: [AuthModule],
  controllers: [
    GiftAdminController,
    GiftCategoryAdminController,
    GiftUserController,
  ],
  providers: [
    GiftAdminService,
    GiftCategoryAdminService,
    GiftUserService,
    GiftCategoryRepository,
    GiftRepository,
  ],
  exports: [GiftRepository],
})
export class GiftModule {}
