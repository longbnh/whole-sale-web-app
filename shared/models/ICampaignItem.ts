import { IProduct } from "./IProduct";
import { IMilestone } from "./IMilestone";
import { ISubCategory } from "./ICategory";
import { IImage } from "./IImage";
import { IShop } from "./IShop";
import IBrand from "./IBrand";

export interface ICampaignItem {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  promotionPlan?: {
    id: number;
    name: string;
  };
  imageUrl: string;
  currentSaleQuantity: number;
  inStockQuantity: number;
  status: number;
  mileStones: IMilestone[];
}
