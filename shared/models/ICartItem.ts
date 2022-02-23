import { IMilestone } from "./IMilestone";

export interface ICartItem {
  productId: number;
  name: string;
  quantity: number;
  imageUrl: string;
  hasCampaign: boolean;
  campaign?: {
    id: number;
    startDate: string;
    endDate: string;
    currentSaleQuantity: number;
    inStockQuantity: number;
    mileStones: IMilestone[];
  };
}
