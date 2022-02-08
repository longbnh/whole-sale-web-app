import { SHOP_API } from "../shared/enum/enum";
import IBrand from "../shared/models/IBrand";
import axiosClient from "./axiosClient";

const brandApi = {
  getBrand: () => {
    const url = SHOP_API.Brand;
    return axiosClient.get<IBrand[]>(url);
  },
};

export default brandApi;
