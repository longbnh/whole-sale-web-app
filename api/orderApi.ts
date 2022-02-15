import { CUSTOMER_API } from "../shared/enum/enum";
import { IOrder } from "../shared/models/IOrder";
import axiosClient from "./axiosClient";

const orderApi = {
  createOrders: (body: IOrder) => {
    const url = CUSTOMER_API.order;
    return axiosClient.post<any>(url, body);
  },
};

export default orderApi;
