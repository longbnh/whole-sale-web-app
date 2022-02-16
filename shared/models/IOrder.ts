export interface orderInfo {
    campaignId: number;
    quantity: number;
}

export interface IOrder {
    campaigns: orderInfo[];
    addressId: number;
    paymentType: number;
    returnUrl: string;
}