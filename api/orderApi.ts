import {SHOP_API} from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IOrder} from "../shared/models/IOrder";
import {IPaymentType} from "../shared/models/IPaymentType";

const orderApi = {
    createOrder: (order : IOrder) => {
        const url = `${
            SHOP_API.Order
        }`;
        return axiosClient.post(url, order);
    },
    getPaymentType: () => {
        const url = `${
            SHOP_API.Order
        }/${SHOP_API.PaymentType}`;
        return axiosClient.get<IPaymentType[]>(url);
    }
}

export default orderApi