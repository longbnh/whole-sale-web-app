import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IPagination} from "../shared/models/IPagination";
import {ICampaignItem} from "../shared/models/ICampaignItem";

const shopApi = {
    getCampaigns: (shopId: number, page: number, pageSize: number
                   , productName: string, sort: number, order: number) => {
        const url = `${SHOP_API.Shop}/${shopId}/campaigns`;
        const param = `?Page=${page}&PageSize=${pageSize}&ProductName=${productName}&Sort=${sort}${order !== null ? `&Order=${order}` : ""}`
        return axiosClient.get<IPagination<ICampaignItem>>(`${url}${param}`, {headers: {
                "content-type": "application/json",
                accountId: 2,
            }});
    },
};

export default shopApi;
