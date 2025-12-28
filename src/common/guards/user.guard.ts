import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthCommonService } from '../../auth/services/common/auth.common.service';
import { UnauthorizedExc } from '../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../core';
import { UserRepository } from '../../users/repositories/user.repository';
import { UserAuthenticatedInterface } from '../interfaces/authenticate.interface';

@Injectable()
export class UserGuard implements CanActivate {
  private _logger: LoggerService = new LoggerService(UserGuard.name);

  constructor(
    private readonly authCommonService: AuthCommonService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token: string = this.extractTokenFromHeader(request) ?? '';

    if (!token) {
      throw new UnauthorizedExc('Access token is required');
    }

    let payload: any;

    try {
      payload = this.authCommonService.verifyToken(token);
    } catch (error) {
      this._logger.error('Auth user error', error);
      throw new UnauthorizedExc('Invalid token');
    }

    const user = await this.userRepository.findByIdAndActive(payload.userId);

    if (!user) {
      throw new UnauthorizedExc('User not found or not active');
    }

    request.user = {
      id: user.id,
      phoneNumber: user.phoneNumber,
    } as UserAuthenticatedInterface;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
