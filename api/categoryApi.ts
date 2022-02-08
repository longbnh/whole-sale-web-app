import { SHOP_API } from "../shared/enum/enum";
import ICategory from "../shared/models/ICategory";
import axiosClient from "./axiosClient";

const categoryApi = {
  getCategory: () => {
    const url = SHOP_API.Category;
    return axiosClient.get<ICategory[]>(url);
  },
};

export default categoryApi;
