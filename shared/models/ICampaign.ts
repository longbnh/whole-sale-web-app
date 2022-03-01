import {IMilestone} from "./IMilestone";
import {ISubCategory} from "./ICategory";
import {IImage} from "./IImage";
import {IShop} from "./IShop";
import IBrand from "./IBrand";
import {IPromotionPlan} from "./IPromotionPlan";
import {CampaignDisplayStatus} from "../type/type";

export interface ICampaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    currentSaleQuantity: number;
    inStockQuantity?: number;
    promotionPlan: IPromotionPlan;
    status: CampaignDisplayStatus;
    catePath: string;
    category: ISubCategory;
    origin?: string;
    brand?: IBrand;
    description?: string;
    //for request that get multiple images
    images?: IImage[];
    //for request that get only one image
    imageUrl?: string;
    shop?: IShop;
    mileStones: Array<IMilestone>;
}