import {IProduct} from "./IProduct";
import {IMilestone} from "./IMilestone";
import {ISubCategory} from "./ICategory";
import {IImage} from "./IImage";
import {IShop} from "./IShop";
import IBrand from "./IBrand";
import {IPromotionPlan} from "./IPromotionPlan";

export interface ICampaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    currentSaleQuantity: number;
    inStockQuantity?: number;
    promotionPlan?: IPromotionPlan;
    status?: number;
    catePath: string;
    category: ISubCategory;
    origin: string;
    brand: IBrand;
    description: string;
    images: IImage[];
    shop: IShop;
    mileStones: Array<IMilestone>;
}