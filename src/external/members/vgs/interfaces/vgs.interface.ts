export interface VgsVariableInterface {
  smsUrl: string;
  znsUrl: string;
  znsOaId: string;
  accessToken: string;
  authorization: string;
  username: string;
  branchName: string;
  transactionExternalId: string;

  mooziWaExchangeGiftZnsTemplateId: string;
  pgmsUpdateInventoryZnsTemplateId: string;
  otpZnsTemplateId: string;
}

export interface VgsSendZnsRequestInterface {
  oa_id: string;
  sending_mode?: string;
  template_id: string;
  template_data?: any;
  phone_number?: string;
}

export interface VgsSendSmsRequestInterface {
  message?: string;
  brand?: string;
  unicode?: string;
}
