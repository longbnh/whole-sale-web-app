import { CUSTOMER_API } from "../shared/enum/enum";
import { IRequestPage } from "../shared/models/IRequestPage";
import axiosClient from "./axiosClient";

const customerApi = {
  getOrderHistory: (
    page: IRequestPage,
    orderNumber?: string,
    status?: number,
    month?: number,
    year?: number,
    offset?: number
  ) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Order}`;
    const param = {
      ...page,
      orderNumber: orderNumber,
      status: status,
      month: month,
      year: year,
      offset: offset,
    };
    return axiosClient.get(url, { params: param });
  },
  getOrderHistoryByOrderName: (orderNumber: string) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Order}/${orderNumber}`;
    return axiosClient.get(url);
  },
  cancelOrder: (orderNumber: string) => {
    const url = `${CUSTOMER_API.Customer}${CUSTOMER_API.Order}/${orderNumber}/${CUSTOMER_API.Cancel}`;
    return axiosClient.put(url);
  },
};

export default customerApi;
