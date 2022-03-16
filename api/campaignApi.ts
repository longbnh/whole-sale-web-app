import { SHOP_API } from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import { IPagination } from "../shared/models/IPagination";
import { ICampaign } from "../shared/models/ICampaign";
import { IRequestPage } from "../shared/models/IRequestPage";
import { ICampaign as ICampaignRequest } from "../shared/models/modifyApi/ICampaign";
import { IOrderSeller } from "../shared/models/IOrder";
import {CampaignDisplayStatus} from "../shared/type/paginationTypes";

const config = {
  headers: {
    "content-type": "application/json",
    accountId: 2,
  },
};

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
  getOrderByCampaign: (
    campaignId: number,
    pageRequest: IRequestPage,
    orderNumber?: string,
    status?: number
  ) => {
    const url = `${SHOP_API.Campaign}/${campaignId}/${SHOP_API.Order}`;
    const param = {
      ...pageRequest,
      campaignId: campaignId,
      status: status,
      orderNumber: orderNumber,
    };
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
  createCampaign: (productId: number, campaign: ICampaignRequest) => {
    const url = `${SHOP_API.Product}/${productId}${SHOP_API.Campaign}`;
    const config = {
      headers: {
        "content-type": "application/json",
        accountId: 2,
      },
    };
    return axiosClient.post<ICampaign>(url, campaign, config);
  },
  updateCampaign: (campaignId: number, campaign: ICampaignRequest) => {
    const url = `${SHOP_API.Campaign}/${campaignId}`;

    return axiosClient.put<ICampaign>(url, campaign, config);
  },
  getAllCampaign: (search: string, pageRequest?: IRequestPage) => {
    const url = `${SHOP_API.Campaign}`;
    const param = { ...pageRequest, search: search };
    return axiosClient.get(url, { params: param });
  },
  updateCampaignStatus: (id: number, newStatus: CampaignDisplayStatus) => {
    const url = `${SHOP_API.Campaign}/${id}${SHOP_API.Status}?newStatus=${newStatus}`;
    // const param = {
    //   newStatus: newStatus,
    // }
    return axiosClient.put(url, {}, config);
  }
};

export default campaignApi;
