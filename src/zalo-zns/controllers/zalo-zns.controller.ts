import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponseDto } from '../../common/dtos/app-response.dto';
import { ZaloZnsService } from '../services/zalo-zns.service';
import { ZaloZnsSendOtpRequestDto } from '../dtos/requests/otp/zalo-zns.send.otp.request.dto';
import { ZaloZnsSendOtpResponseDto } from '../dtos/responses/otp/zalo-zns.send.otp.response.dto';
import { ZaloZnsVerifyOtpRequestDto } from '../dtos/requests/otp/zalo-zns.verify.otp.request.dto';
import { ZaloZnsVerifyOtpResponseDto } from '../dtos/responses/otp/zalo-zns.verify.otp.response.dto';
@Controller({ version: '1', path: `` })
@ApiTags('Zalo ZNS controller')
export class ZaloZnsController {
  constructor(private readonly zaloZnsService: ZaloZnsService) {}

  @Post('send-zalo')
  async sendOtp(@Body() dto: ZaloZnsSendOtpRequestDto) {
    const result = await this.zaloZnsService.sendOtp(dto);
    return new AppResponseDto(new ZaloZnsSendOtpResponseDto(result));
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: ZaloZnsVerifyOtpRequestDto) {
    const result = await this.zaloZnsService.verifyOtp(dto);
    return new AppResponseDto(new ZaloZnsVerifyOtpResponseDto(result));
  }
}
