import { Injectable } from '@nestjs/common';
import { SystemConfigRepository } from 'src/system-configs/repositories/system-config.repository';
import { BadRequestExc } from '../../common/exceptions/custom-http.exception';
import { generateOTP } from '../../common/utils/generation.util';
import { LoggerService } from '../../core';
import { VgsService } from '../../external/members/vgs/services/vgs.service';
import { RedisService } from '../../redis/services/redis.service';
import { ZaloZnsSendOtpRequestDto } from '../dtos/requests/otp/zalo-zns.send.otp.request.dto';
import { ZaloZnsVerifyOtpRequestDto } from '../dtos/requests/otp/zalo-zns.verify.otp.request.dto';
import { OtpStatusEnum } from '../enums/otp.enum';

@Injectable()
export class ZaloZnsService {
  private readonly _logger = new LoggerService(ZaloZnsService.name);
  private readonly _ttl = 60;

  constructor(
    private readonly redisService: RedisService,
    private readonly vgsService: VgsService,
    private readonly systemConfigRepo: SystemConfigRepository,
  ) {}

  async sendOtp(dto: ZaloZnsSendOtpRequestDto) {
    const { phoneNumber, source } = dto;

    let otp = '';
    const vgsConfig = await this.systemConfigRepo.getVgsConfig();
    if (!vgsConfig?.data?.isActiveZNS) {
      this._logger.log('ZNS is not active', vgsConfig);
      otp = '0000'; // Set default otp to 0000 when ZNS is not active
    } else {
      otp = generateOTP();

      const response = await this.vgsService.sendZnsOtp(phoneNumber, otp);
      if (!response) {
        throw new BadRequestExc('Gửi OTP thất bại, vui lòng thử lại.');
      }
    }

    const cached = await this.redisService.set(
      `otp::${source}:${phoneNumber}`,
      otp,
      this._ttl,
    );

    this._logger.log(`OTP sent to ${phoneNumber}`, { otp });
    this._logger.log(`OTP cached in redis`, { cached });
    const result = {
      status: OtpStatusEnum.SUCCEEDED,
      ttl: this._ttl,
    };
    return result;
  }

  async verifyOtp(dto: ZaloZnsVerifyOtpRequestDto) {
    const { phoneNumber, source, otp } = dto;
    const cached = await this.redisService.get(`otp::${source}:${phoneNumber}`);
    this._logger.log(`OTP cached in redis`, { cached, otp });
    if (!cached) {
      throw new BadRequestExc('Mã OTP đã hết hạn');
    }
    if (cached.toString() !== otp.toString()) {
      throw new BadRequestExc('Mã OTP không hợp lệ');
    }
    const result = {
      status: OtpStatusEnum.VERIFIED,
    };
    return result;
  }
}
