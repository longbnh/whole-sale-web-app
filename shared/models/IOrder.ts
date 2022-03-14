import { ICampaign } from "./ICampaign";
import { IShop } from "./IShop";

export interface orderInfo {
  campaignId: number;
  quantity: number;
  productId: number;
}

export interface IOrder {
  campaigns: orderInfo[];
  addressId: number;
  paymentType: number;
  returnUrl: string;
}

export interface IOrderSeller {
  orderNumber: string;
  receiverDetails: {
    receiverName: string;
    phoneNumber: string;
    detailAddress: string;
    latitude: number;
    longitude: number;
    ward: string;
    district: string;
    city: string;
  };
  priceEach: number;
  quantity: number;
  totalPrice: number;
  status: number;
  statusString: string;
  campaign: ICampaign;
  orderTimes: IOrderTime[];
}

export interface IOrderTime {
  dateType: number;
  dateTypeString: string;
  time: Date;
}

export interface IOrderCustomer extends IOrderSeller {
  shop: IShop;
  hasCashback: boolean;
  paymentType: number;
  paymentTypeString: string;
}
