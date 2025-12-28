import { VIETGUYS_ZALO_ZNC_ERROR } from '../../constants/vgs.constant';

export class ZaloZncVietGuysResponseDto {
  resultCode: keyof typeof VIETGUYS_ZALO_ZNC_ERROR; // 0: success,
  resultDesc: string; // description of resultCode

  constructor(data: ZaloZncVietGuysResponseDto) {
    Object.assign(this, data);
  }
}
