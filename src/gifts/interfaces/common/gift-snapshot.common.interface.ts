import { GiftStatusEnum, GiftTypeEnum } from '../../enums/gift.enum';

export interface GiftSnapshotInterface {
  id: number;
  name: string;
  status: GiftStatusEnum;
  type: GiftTypeEnum;
  quantity: number;
  price: number;
}
