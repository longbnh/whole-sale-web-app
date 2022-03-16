import { SHOP_API } from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import { IOrder } from "../shared/models/IOrder";
import { IPaymentType } from "../shared/models/IPaymentType";
import { IVNPayOrder } from "../shared/models/IVNPayOrder";

const orderApi = {
  createOrder: (order: IOrder) => {
    const url = `${SHOP_API.Order}`;
    return axiosClient.post<IVNPayOrder[]>(url, order);
  },
  getPaymentType: () => {
    const url = `${SHOP_API.Order}${SHOP_API.PaymentType}`;
    return axiosClient.get<IPaymentType[]>(url);
  },
  updateReceivedStatus: (orderNumber: string) => {
    const url = `${SHOP_API.Order}/${orderNumber}${SHOP_API.Status}${SHOP_API.Received}`;
    return axiosClient.put(url);
  },
  updatePackagedStatus: (orderNumber: string) => {
    const url = `${SHOP_API.Order}/${orderNumber}${SHOP_API.Status}${SHOP_API.Packaged}`;
    return axiosClient.put(url);
  },
  updateOnDeliveryStatus: (orderNumber: string) => {
    const url = `${SHOP_API.Order}/${orderNumber}${SHOP_API.Status}${SHOP_API.OnDelivery}`;
    return axiosClient.put(url);
  },
  updateDeliveredStatus: (orderNumber: string) => {
    const url = `${SHOP_API.Order}/${orderNumber}${SHOP_API.Status}${SHOP_API.Delivered}`;
    return axiosClient.put(url);
  },
  updatePackageReturnedStatus: (orderNumber: string) => {
    const url = `${SHOP_API.Order}/${orderNumber}${SHOP_API.Status}${SHOP_API.PackageReturned}`;
    return axiosClient.put(url);
  },
};

export default orderApi;
