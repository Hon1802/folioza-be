import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';
import {
  AdminAuthenticatedInterface,
  UserAuthenticatedInterface,
} from '../interfaces/authenticate.interface';

export const NeedAdminAuthDecorator = () =>
  applyDecorators(UseGuards(AdminGuard), ApiBearerAuth());

export const NeedUserAuthDecorator = () =>
  applyDecorators(UseGuards(UserGuard), ApiBearerAuth());

export const AdminAuthenticatedDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.admin as AdminAuthenticatedInterface;
  },
);

export const UserAuthenticatedDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserAuthenticatedInterface;
  },
);
