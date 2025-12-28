import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { GiftModule } from '../gifts/gift.module';
import { OrderAdminController } from './controllers/admin/order.admin.controller';
import { OrderUserController } from './controllers/user/order.user.controller';
import { OrderDetailRepository } from './repositories/order-detail.repository';
import { OrderShipmentRepository } from './repositories/order-shipment.repository';
import { OrderRepository } from './repositories/order.repository';
import { OrderAdminService } from './services/admin/order.admin.service';
import { OrderUserService } from './services/user/order.user.service';

@Module({
  imports: [AuthModule, GiftModule],
  controllers: [OrderAdminController, OrderUserController],
  providers: [
    OrderAdminService,
    OrderUserService,
    OrderRepository,
    OrderDetailRepository,
    OrderShipmentRepository,
  ],
  exports: [OrderUserService, OrderRepository, OrderDetailRepository],
})
export class OrderModule {}
