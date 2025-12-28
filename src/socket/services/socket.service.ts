import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketEventEnum } from '../enums/socket-event.enum';

@Injectable()
export class SocketService {
  private server: Server;
  private readonly logger = new Logger(SocketService.name);

  setServer(server: Server) {
    this.server = server;
  }

  async addUserSocket(userId: string | number, socket: Socket) {
    try {
      await socket.join(`user:${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to add user socket for userId: ${userId}`,
        error,
      );
    }
  }

  async removeUserSocket(userId: string | number, socket: Socket) {
    try {
      await socket.leave(`user:${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to remove user socket for userId: ${userId}`,
        error,
      );
    }
  }

  emitToUser<T>(userId: string | number, event: SocketEventEnum, data: T) {
    try {
      this.server.to(`user:${userId}`).emit(event, data);
    } catch (error) {
      this.logger.error(
        `Failed to emit to user: ${userId}, event: ${event}`,
        error,
      );
    }
  }

  emitToUsers<T>(userIds: string[], event: SocketEventEnum, data: T) {
    try {
      const rooms = userIds.map((userId) => `user:${userId}`);
      this.server.to(rooms).emit(event, data);
    } catch (error) {
      this.logger.error(
        `Failed to emit to users: ${userIds.join(', ')}, event: ${event}`,
        error,
      );
    }
  }

  broadcastToAll(event: SocketEventEnum, data: any) {
    try {
      this.server.emit(event, data);
    } catch (error) {
      this.logger.error(`Failed to broadcast to all, event: ${event}`, error);
    }
  }
}
