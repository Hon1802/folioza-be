import { Module } from '@nestjs/common';
import { SocketModule } from 'src/socket/socket.module';
import { AuthModule } from '../auth/auth.module';
import { GiftModule } from '../gifts/gift.module';
import { OrderModule } from '../orders/order.module';
import { JourneyDetailAdminController } from './controllers/admin/journey-detail.admin.controller';
import { JourneyAdminController } from './controllers/admin/journey.admin.controller';
import { UserJourneyDetailAdminController } from './controllers/admin/user-journey-detail.admin.controller';
import { UserJourneyAdminController } from './controllers/admin/user-journey.admin.controller';
import { JourneyUserController } from './controllers/user/journey.user.controller';
import { UserJourneyUserController } from './controllers/user/user-journey.user.controller';
import { JourneyDetailRepository } from './repositories/journey-detail.repository';
import { JourneyRepository } from './repositories/journey.repository';
import { UserJourneyDetailRepository } from './repositories/user-journey-detail.repository';
import { UserJourneyRepository } from './repositories/user-journey.repository';
import { JourneyDetailAdminService } from './services/admin/journey-detail.admin.service';
import { JourneyAdminService } from './services/admin/journey.admin.service';
import { UserJourneyDetailAdminService } from './services/admin/user-journey-detail.admin.service';
import { UserJourneyAdminService } from './services/admin/user-journey.admin.service';
import { JourneyUserService } from './services/user/journey.user.service';
import { UserJourneyUserService } from './services/user/user-journey.user.service';

@Module({
  imports: [AuthModule, GiftModule, OrderModule, SocketModule],
  controllers: [
    JourneyAdminController,
    JourneyDetailAdminController,
    JourneyUserController,
    UserJourneyAdminController,
    UserJourneyUserController,
    UserJourneyDetailAdminController,
  ],
  providers: [
    JourneyAdminService,
    JourneyDetailAdminService,
    JourneyUserService,
    UserJourneyAdminService,
    UserJourneyUserService,
    UserJourneyDetailAdminService,
    JourneyRepository,
    JourneyDetailRepository,
    UserJourneyRepository,
    UserJourneyDetailRepository,
  ],
})
export class JourneyModule {}
