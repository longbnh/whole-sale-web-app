import { SHOP_API } from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import { IPagination } from "../shared/models/IPagination";
import { ICampaign } from "../shared/models/ICampaign";
import { IRequestPage } from "../shared/models/IRequestPage";
import { ICampaignItem } from "../shared/models/ICampaignItem";

const campaignApi = {
  getCampaign: (campaignId: number) => {
    const url = `${SHOP_API.Campaign}/${campaignId}`;
    return axiosClient.get<ICampaign>(url);
  },
  getCampaignByCategory: (
    categoryId: number,
    search?: string,
    pageRequest?: IRequestPage
  ) => {
    const url = `${SHOP_API.Campaign}/byCategory`;
    const param = { ...pageRequest, categoryId: categoryId, search: search };
    return axiosClient.get<IPagination<ICampaignItem>>(url, { params: param });
  },
};

export default campaignApi;
