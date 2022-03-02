import { SHOP_API } from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import { IPagination } from "../shared/models/IPagination";
import { ICampaign } from "../shared/models/ICampaign";
import { IRequestPage } from "../shared/models/IRequestPage";
import { IOrderSeller } from "../shared/models/IOrder";

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
    return axiosClient.get<IPagination<ICampaign>>(url, { params: param });
  },
  getCampaigns: (...idArray: number[]) => {
    const f = (id: number) =>
      campaignApi.getCampaign(id).then((response) => {
        return response.data;
      });
    return Promise.all(idArray.map(f));
  },
  getCampaignForSeller: (campaignId: number) => {
    const url = `${SHOP_API.Campaign}/${campaignId}`;
    const config = {
      headers: {
        "content-type": "application/json",
        accountId: 2,
      },
    };
    return axiosClient.get<ICampaign>(url, config);
  },
  getOrderByCampaign: (campaignId: number, pageRequest: IRequestPage) => {
    const url = `${SHOP_API.Campaign}/${campaignId}/${SHOP_API.Order}`;
    const param = { ...pageRequest, campaignId: campaignId };
    // sau này bỏ
    const config = {
      headers: {
        "content-type": "application/json",
        accountId: 2,
      },
    };
    // sau này bỏ
    return axiosClient.get<IPagination<IOrderSeller>>(url, {
      params: param,
      ...config,
    });
  },
};

export default campaignApi;
