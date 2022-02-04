import { SHOP_API } from "../components/enum";
import IBrand from "../components/models/IBrand";
import axiosClient from "./axiosClient";

const brandApi = {
  getBrand: () => {
    const url = SHOP_API.Brand;
    return axiosClient.get<IBrand[]>(url);
  },
};

export default brandApi;
