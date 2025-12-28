import { Injectable } from '@nestjs/common';
import { AdminStatusEnum } from '../../../admin/enums/admin.enum';
import { AdminRepository } from '../../../admin/repositories/admin.repository';
import {
  NotFoundExc,
  UnauthorizedExc,
} from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { LoginAdminRequestDto } from '../../dtos/requests/admin/auth.admin.request.dto';
import { RefreshTokenRequestDto } from '../../dtos/requests/common/refresh-token.common.request';
import { UserType } from '../../enums/user-type.enum';
import { LoginAdminResultInterface } from '../../interfaces/admin/auth.admin.interface';
import { JwtAuthPayload } from '../../interfaces/common/jwt-payload.interface';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthAdminService {
  private _logger = new LoggerService(AuthAdminService.name);

  constructor(
    private readonly authCommonService: AuthCommonService,
    private readonly adminRepository: AdminRepository,
  ) {}

  async login(dto: LoginAdminRequestDto): Promise<LoginAdminResultInterface> {
    const { email, password } = dto;

    // Find admin by email
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) {
      throw new UnauthorizedExc('Email không tồn tại!');
    }

    // Check if admin is active
    if (admin.status === AdminStatusEnum.INACTIVE) {
      throw new UnauthorizedExc(
        'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với Admin để biết thêm thông tin.',
      );
    }

    // Verify password
    const isPasswordValid = this.authCommonService.compareHash(
      password,
      admin.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedExc('Mật khẩu không chính xác!');
    }

    // Update last login
    await this.adminRepository.updateLastLogin(admin.id);

    // Generate tokens
    const payload: JwtAuthPayload = {
      userId: admin.id,
      userType: UserType.ADMIN,
      role: admin.role,
    };

    this._logger.log(`Admin logged in: ${email}`);

    return {
      admin,
      accessToken: this.authCommonService.generateAccessToken(payload),
      refreshToken: this.authCommonService.generateRefreshToken(payload),
    };
  }

  async refreshToken({ refreshToken }: RefreshTokenRequestDto) {
    const payload = this.authCommonService.verifyToken(
      refreshToken,
    ) as JwtAuthPayload;

    if (payload.userType !== UserType.ADMIN) {
      throw new UnauthorizedExc('Loại token không đúng!');
    }

    const admin = await this.adminRepository.findByIdAndActive(payload.userId);
    if (!admin) {
      throw new NotFoundExc('Không tìm thấy admin!');
    }

    const newPayload: JwtAuthPayload = {
      userId: admin.id,
      userType: UserType.ADMIN,
      role: admin.role,
    };

    return {
      accessToken: this.authCommonService.generateAccessToken(newPayload),
      refreshToken: this.authCommonService.generateRefreshToken(newPayload),
    };
  }
}
