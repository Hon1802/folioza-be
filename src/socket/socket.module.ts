import { Global, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SocketGateway } from './gateways/socket.gateway';
import { SocketService } from './services/socket.service';

@Global()
@Module({
  imports: [AuthModule],
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
