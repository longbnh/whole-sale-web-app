import { SHOP_API } from "../shared/enum/enum";
import IOrigin from "../shared/models/IOrigin";
import axiosClient from "./axiosClient";

const originApi = {
  getOrigin: () => {
    const url = SHOP_API.Origin;
    return axiosClient.get<IOrigin[]>(url);
  },
};

export default originApi;
