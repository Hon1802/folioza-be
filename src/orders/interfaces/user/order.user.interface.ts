export interface CreateOrderUserDataInterface {
  data: {
    giftId: number;
    quantity: number;
    userJourneyId: number;
  }[];
  address?: string;
  wardId?: number;
  provinceId?: number;
}
