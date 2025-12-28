import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Prefix } from 'src/common/constants/index.constant';
import { AuthCommonService } from '../../auth/services/common/auth.common.service';
import { SocketService } from '../services/socket.service';

@WebSocketGateway({
  cors: { origin: '*' },
  path: `/${Prefix.GLOBAL}/socket`,
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly authCommonService: AuthCommonService,
  ) {}

  afterInit() {
    this.socketService.setServer(this.server);
  }

  async handleConnection(client: Socket) {
    try {
      const headers = client.handshake.headers;
      const authorization = headers.authorization;
      if (!authorization) {
        client.disconnect();
        return;
      }

      const authorizationParts = authorization.split(' ');
      // Only Bearer token is allowed
      if (
        authorizationParts.length !== 2 ||
        authorizationParts[0] !== 'Bearer'
      ) {
        client.disconnect();
        return;
      }

      const token = authorizationParts[1];
      const decoded = await this.authCommonService.verifyToken(token);
      const userId = decoded.userId;

      console.log('Connected', userId);

      if (!userId) {
        client.disconnect();
        return;
      }
      await this.socketService.addUserSocket(userId, client);
    } catch (error) {
      console.log(error);
      client.disconnect();
      return;
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      await this.socketService.removeUserSocket(userId, client);
    }
  }
}
