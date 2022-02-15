interface ICampaign {
  campaignId: number;
  quantity: number;
}

export interface IOrder {
  campaigns: ICampaign[];
  addressId: number;
  paymentType: number;
  returnUrl: string;
}
