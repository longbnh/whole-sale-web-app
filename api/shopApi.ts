import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IPagination} from "../shared/models/IPagination";
import {IRequestPageAlter} from "../shared/models/IRequestPage";
import {ICampaign} from "../shared/models/ICampaign";

const shopApi = {
    getCampaigns: (shopId: number, productName?: string
        , status?: number, order?: number, pageRequest?: IRequestPageAlter) => {
        const url = `${SHOP_API.Shop}/${shopId}/campaigns`;
        const param = {...pageRequest, productName: productName, status: status, order: order}

        const config = {
            headers: {
                "content-type": "application/json",
                accountId: 2,
            },
            params: param
        }
        return axiosClient.get<IPagination<ICampaign>>(`${url}`, config);
    },
};

export default shopApi;
