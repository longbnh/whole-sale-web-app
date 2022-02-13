import {IProduct} from "./IProduct";
import {IMilestone} from "./IMilestone";
import {ISubCategory} from "./ICategory";
import {IImage} from "./IImage";
import {IShop} from "./IShop";
import IBrand from "./IBrand";

export interface ICampaign {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    currentSaleQuantity: number;
    inStockQuantity?: number;
    promotionPlanId?: number;
    status?: number;
    // basicInfo: IProduct;
    category: ISubCategory;
    origin: string;
    brand: IBrand;
    description: string;
    images: IImage[];
    shop: IShop;
    mileStones: Array<IMilestone>;
}