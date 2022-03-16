import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IPagination} from "../shared/models/IPagination";
import {IRequestPage} from "../shared/models/IRequestPage";
import {ICampaign} from "../shared/models/ICampaign";

const shopApi = {
    getCampaigns: (shopId: number, productName?: string, pageRequest?: IRequestPage) => {
        const url = `${SHOP_API.Shop}/${shopId}/campaigns`;
        const param = {...pageRequest, productName: productName}

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
