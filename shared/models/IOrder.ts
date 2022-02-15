export interface IOrder {
    campaignId: number;
    quantity: number;
    addressId: number;
    paymentType: number;
    returnUrl: string;
}