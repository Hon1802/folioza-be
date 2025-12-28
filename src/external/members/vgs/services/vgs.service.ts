import { Injectable } from '@nestjs/common';
import { LoggerService } from '../../../../core';
import {
  VgsSendZnsRequestInterface,
  VgsVariableInterface,
} from '../interfaces/vgs.interface';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig } from '../../../../common/configs/global.config';
import { HttpService } from '@nestjs/axios';
import { OutboxMessageRepository } from '../../../repositories/outbox-message.repository';
import { generateRandomTransactionExternalId } from '../../../../common/utils/generation.util';
import {
  CallType,
  OutboxMessageStatus,
  OutboxMessageType,
  SyncProvider,
  SyncType,
} from '../../../enums/outbox-message.enum';
import { ZaloZncVietGuysResponseDto } from '../dtos/responses/vgs.response.dto';
import { SystemConfigRepository } from '../../../../system-configs/repositories/system-config.repository';

@Injectable()
export class VgsService {
  private readonly _logger = new LoggerService(VgsService.name);

  private variables: VgsVariableInterface;
  private nodeEnv: string;

  constructor(
    private configService: ConfigService<GlobalConfig>,
    private httpService: HttpService,
    private outboxMessageRepo: OutboxMessageRepository,
    private systemConfigRepo: SystemConfigRepository,
  ) {
    this.nodeEnv = this.configService.get('app.env');
    this.getVariables();
  }

  private async getVariables() {
    this.variables = {
      smsUrl: this.configService.get('external.vgs.smsUrl'),
      znsUrl: this.configService.get('external.vgs.znsUrl'),
      znsOaId: this.configService.get('external.vgs.znsOaId'),
      accessToken: this.configService.get('external.vgs.accessToken'),
      authorization: `Bearer ${this.configService.get(
        'external.vgs.accessToken',
      )}`,
      username: this.configService.get('external.vgs.username'),
      branchName: this.configService.get('external.vgs.branchName'),
      transactionExternalId: generateRandomTransactionExternalId(),
      mooziWaExchangeGiftZnsTemplateId: this.configService.get(
        'external.vgs.mooziWaExchangeGiftZnsTemplateId',
      ),
      pgmsUpdateInventoryZnsTemplateId: this.configService.get(
        'external.vgs.pgmsUpdateInventoryZnsTemplateId',
      ),
      otpZnsTemplateId: this.configService.get('external.vgs.otpZnsTemplateId'),
    };
  }

  async sendZns(
    phoneNumber: string,
    znsRequest: VgsSendZnsRequestInterface,
  ): Promise<ZaloZncVietGuysResponseDto | null> {
    const { znsUrl, authorization, username, transactionExternalId } =
      this.variables;

    const vgsConfig = await this.systemConfigRepo.getVgsConfig();
    if (!vgsConfig?.data?.isActiveZNS) {
      this._logger.log('ZNS is not active', vgsConfig);
      return null;
    }

    const payload = {
      username,
      mobile: phoneNumber,
      bid: transactionExternalId,
      zns: znsRequest,
    };

    try {
      const response =
        await this.httpService.axiosRef.post<ZaloZncVietGuysResponseDto>(
          znsUrl,
          payload,
          {
            headers: { Authorization: authorization },
          },
        );

      const { data } = response;
      if (data?.resultCode == '0') {
        this._logger.log('Send ZNS success', data);
        return data;
      }

      this._logger.error('Send ZNS failed', data);
      return data;
    } catch (error) {
      this._logger.error('Exception when sending ZNS', error);
      this._logger.error('Data', error?.response?.data);
      return null;
    }
  }

  // sent OTP

  async sendZnsOtp(to: string, otp: string, user_id?: number) {
    this._logger.log('Send ZNS OTP', { to, otp });

    const znsRequest: VgsSendZnsRequestInterface = {
      oa_id: this.variables.znsOaId,
      template_id: this.variables.otpZnsTemplateId,
      template_data: {
        otp,
      },
      phone_number: to,
    };

    const response = await this.sendZns(to, znsRequest);
    const isSuccess = response?.resultCode == '0';

    await this.logZnsRequestToOutbox(
      znsRequest,
      OutboxMessageType.SEND_OTP,
      isSuccess ? OutboxMessageStatus.SUCCESS : OutboxMessageStatus.FAILED,
      response,
    );

    return isSuccess;
  }

  // log to outbox
  private async logZnsRequestToOutbox(
    znsRequest: VgsSendZnsRequestInterface,
    type: OutboxMessageType,
    status: OutboxMessageStatus,
    response: ZaloZncVietGuysResponseDto | null,
  ) {
    try {
      await this.outboxMessageRepo.insert({
        provider: SyncProvider.VGS,
        callType: CallType.SYNC,
        syncType: SyncType.IMMEDIATE,
        request: JSON.stringify(znsRequest),
        retryNumber: 0,
        status,
        type,
        response: JSON.stringify(response),
      });
    } catch (error) {
      this._logger.error('Error when log ZNS request to outbox', error);
    }
  }
}
