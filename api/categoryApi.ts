import { SHOP_API } from "../components/enum";
import ICategory from "../components/models/ICategory";
import axiosClient from "./axiosClient";

const categoryApi = {
  getCategory: () => {
    const url = SHOP_API.Category;
    return axiosClient.get<ICategory[]>(url);
  },
};

export default categoryApi;
