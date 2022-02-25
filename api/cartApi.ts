import { CUSTOMER_API } from "../shared/enum/enum";
import { ICartItem } from "../shared/models/ICartItem";
import { IPagination } from "../shared/models/IPagination";
import { IRequestPage } from "../shared/models/IRequestPage";
import axiosClient from "./axiosClient";

const cartApi = {
  addToCart: (campaign: { campaignId: number; quantity: number }) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Cart}`;
    return axiosClient.post(url, {}, { params: { ...campaign } });
  },
  getCart: (pageRequest: IRequestPage) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Cart}`;
    return axiosClient
      .get<IPagination<ICartItem>>(url, {
        params: pageRequest,
      })
      .then((res) => res.data);
  },
  updateQuantityItem: (productId: number, quantity: number) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Cart}`;
    return axiosClient.put(url, {}, { params: { productId, quantity } });
  },
  deleteItemCart: (productId: number) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Cart}`;
    return axiosClient.delete(url, { params: productId });
  },
};

export default cartApi;
