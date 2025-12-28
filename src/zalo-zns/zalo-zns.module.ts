import { Module } from '@nestjs/common';
import { SystemConfigRepository } from 'src/system-configs/repositories/system-config.repository';
import { ZaloZnsController } from './controllers/zalo-zns.controller';
import { ZaloZnsService } from './services/zalo-zns.service';
@Module({
  imports: [],
  controllers: [ZaloZnsController],
  providers: [ZaloZnsService, SystemConfigRepository],
  exports: [],
})
export class ZaloZnsModule {}
