import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IPagination} from "../shared/models/IPagination";
import {ICampaign} from "../shared/models/ICampaign";

const campaignApi = {
    getCampaign: (
        campaignId: number,
    ) => {
        const url = `${
            SHOP_API.Campaign
        }/${campaignId}`;
        return axiosClient.get<ICampaign>(url);
    },
}

export default campaignApi