import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IPromotionPlan} from "../shared/models/IPromotionPlan";

const config = {
    headers: {
        "content-type": "application/json",
        accountId: 2,
    }
}

const promotionPlanApi = {
    getPromotionPlans: () => {
        const url = `${SHOP_API.PromotionPlan}`;
        return axiosClient.get<IPromotionPlan[]>(url, config)
    }
}
export default promotionPlanApi;