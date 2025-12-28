import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {
  NotFoundExc,
  UnauthorizedExc,
} from '../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../core';
import { AdminAuthenticatedInterface } from '../interfaces/authenticate.interface';
import { AuthCommonService } from '../../auth/services/common/auth.common.service';
import { AdminRepository } from '../../admin/repositories/admin.repository';
import { Request } from 'express';
import { UserType } from '../../auth/enums/user-type.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  private _logger: LoggerService = new LoggerService(AdminGuard.name);

  constructor(
    private readonly authCommonService: AuthCommonService,
    private readonly adminRepository: AdminRepository,
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
      if (payload.userType !== UserType.ADMIN) {
        throw new UnauthorizedExc('Invalid token type');
      }
    } catch (error) {
      this._logger.error('Auth admin error', error);
      throw new UnauthorizedExc('Invalid token');
    }

    const admin = await this.adminRepository.findByIdAndActive(payload.userId);

    if (!admin) {
      throw new NotFoundExc('Admin not found or not active');
    }

    request.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    } as AdminAuthenticatedInterface;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
