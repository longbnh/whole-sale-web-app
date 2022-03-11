import { IMilestone } from "./IMilestone";
import { ISubCategory } from "./ICategory";
import { IImage } from "./IImage";
import { IShop } from "./IShop";
import IBrand from "./IBrand";
import { IPromotionPlan } from "./IPromotionPlan";
import { CampaignDisplayStatus } from "../type/paginationTypes";

export interface ICampaign {
  id: number;
  productId: number;
  name: string;
  startDate: string;
  endDate: string;
  currentSaleQuantity: number;
  inStockQuantity?: number;
  promotionPlan: IPromotionPlan;
  status: CampaignDisplayStatus;
  statusString?: string;
  rating?: {
    totalReview: number;
    averageRating: number;
    rating1Count: number;
    rating2Count: number;
    rating3Count: number;
    rating4Count: number;
    rating5Count: number;
  };
  catePath?: string;
  category: ISubCategory;
  origin?: string;
  brand?: IBrand;
  description?: string;
  //for request that get multiple images
  images: IImage[];
  //for request that get only one image
  imageUrl?: string;
  shop?: IShop;
  mileStones: Array<IMilestone>;
}
