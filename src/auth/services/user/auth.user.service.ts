import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginUserRequestDto } from 'src/auth/dtos/requests/user/login.user.request.dto';
import { RegisterUserRequestDto } from 'src/auth/dtos/requests/user/register.user.request.dto';
import { GlobalConfig } from 'src/common/configs/global.config';
import { UserChildrenRepository } from 'src/users/repositories/user-children.repository';
import { Transactional } from 'typeorm-transactional';
import {
  ConflictExc,
  NotFoundExc,
  UnauthorizedExc,
} from '../../../common/exceptions/custom-http.exception';
import { LoggerService } from '../../../core';
import { UserStatusEnum } from '../../../users/enums/user.enum';
import { UserRepository } from '../../../users/repositories/user.repository';
import { RefreshTokenRequestDto } from '../../dtos/requests/common/refresh-token.common.request';
import { UserType } from '../../enums/user-type.enum';
import { JwtAuthPayload } from '../../interfaces/common/jwt-payload.interface';
import { LoginUserResultInterface } from '../../interfaces/user/auth.user.interface';
import { AuthCommonService } from '../common/auth.common.service';

@Injectable()
export class AuthUserService {
  private _logger = new LoggerService(AuthUserService.name);

  constructor(
    private readonly authCommonService: AuthCommonService,
    private readonly userRepository: UserRepository,
    private readonly userChildrenRepository: UserChildrenRepository,
    private readonly configService: ConfigService<GlobalConfig>,
  ) {}

  async login(dto: LoginUserRequestDto): Promise<LoginUserResultInterface> {
    const { phoneNumber, key } = dto;

    // Validate key
    // TODO: Call to Zalo Service to verify instead of using key
    if (key !== this.configService.get('auth.userLoginKey')) {
      throw new UnauthorizedExc('Key đăng nhập không chính xác!');
    }

    // Find user by phone number
    const user = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if (!user) {
      throw new NotFoundExc('Không tìm thấy người dùng!');
    }

    // Update last login
    await this.userRepository.updateLastLogin(user.id);

    // Generate tokens
    const payload: JwtAuthPayload = {
      userId: user.id,
      userType: UserType.USER,
    };

    this._logger.log(`User logged in: ${user.id}`);

    return {
      accessToken: this.authCommonService.generateAccessToken(payload),
      refreshToken: this.authCommonService.generateRefreshToken(payload),
      user,
    };
  }

  @Transactional()
  async register(dto: RegisterUserRequestDto) {
    const {
      phoneNumber,
      name,
      avatarUrl,
      userChildren,
      wardId,
      provinceId,
      address,
    } = dto;

    // Check if user already exists
    const userExisted = await this.userRepository.findOne({
      where: [{ phoneNumber }],
    });
    if (userExisted) {
      if (userExisted.phoneNumber === phoneNumber) {
        throw new ConflictExc('Số điện thoại đã được đăng ký!');
      }
    }

    // Create user
    const user = await this.userRepository.save({
      phoneNumber,
      name,
      avatarUrl,
      status: UserStatusEnum.ACTIVE,
      wardId,
      provinceId,
      address,
    });

    // Create user children
    if (userChildren) {
      const userChildrenData = userChildren.map((userChildren) => ({
        userId: user.id,
        ...userChildren,
      }));
      await this.userChildrenRepository.insert(userChildrenData);
    }

    // Generate tokens
    const payload: JwtAuthPayload = {
      userId: user.id,
      userType: UserType.USER,
    };

    this._logger.log(`User registered: ${user.id}`);

    return {
      accessToken: this.authCommonService.generateAccessToken(payload),
      refreshToken: this.authCommonService.generateRefreshToken(payload),
    };
  }

  async refreshToken(dto: RefreshTokenRequestDto) {
    const { refreshToken } = dto;

    const payload = this.authCommonService.verifyToken(
      refreshToken,
    ) as JwtAuthPayload;

    if (payload.userType !== UserType.USER) {
      throw new UnauthorizedExc('Loại token không đúng!');
    }

    const admin = await this.userRepository.findByIdAndActive(payload.userId);
    if (!admin) {
      throw new NotFoundExc('Không tìm thấy admin!');
    }

    const newPayload: JwtAuthPayload = {
      userId: admin.id,
      userType: UserType.ADMIN,
    };

    return {
      accessToken: this.authCommonService.generateAccessToken(newPayload),
      refreshToken: this.authCommonService.generateRefreshToken(newPayload),
    };
  }

  async checkPhoneNumberExists(phoneNumber: string) {
    const user = await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
    return !!user;
  }
}
