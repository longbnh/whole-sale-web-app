import {IProduct} from "./IProduct";
import {IMilestone} from "./IMilestone";

export interface ICampaign {
    id?: number;
    startDate?: string;
    endDate?: string;
    currentSale: number;
    inStockQuantity?: number;
    promotionPlanId?: number;
    status?: number;
    basicInfo?: IProduct;
    milestones: Array<IMilestone>;
}