import { SHOP_API } from "../shared/enum/enum";
import axiosClient from "./axiosClient";
import {IProduct} from "../shared/models/IProduct";
import {IPagination} from "../shared/models/IPagination";

const productApi = {
  createProduct: (product: IProduct, shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products`;
    return axiosClient.post(url, product);
  },
  getProducts: (shopId: number, pageIndex: number, sortType: string) => {
    const url = `${SHOP_API.Shop}/${shopId}/products?Page=${pageIndex}&PageSize=${10}&Sort=${sortType}`;
    return axiosClient.get<IPagination<IProduct>>(url);
  }
};

export default productApi;
