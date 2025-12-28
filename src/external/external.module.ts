import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { SystemConfigRepository } from '../system-configs/repositories/system-config.repository';
import { VgsService } from './members/vgs/services/vgs.service';
import { OutboxMessageRepository } from './repositories/outbox-message.repository';

@Global()
@Module({
  imports: [HttpModule],
  providers: [VgsService, OutboxMessageRepository, SystemConfigRepository],
  exports: [VgsService],
})
export class ExternalModule {}
