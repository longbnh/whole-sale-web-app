import { SHOP_API } from "../shared/enum/enum";
import ISubmitProduct from "../shared/models/ISubmitProduct";
import axiosClient from "./axiosClient";
import { IProduct } from "../shared/models/IProduct";
import { IPagination } from "../shared/models/IPagination";

const productApi = {
  createProduct: (product: IProduct, shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products`;
    return axiosClient.post(url, product);
  },
  getProducts: (
    shopId: number,
    pageIndex: number,
    sortType: string,
    status: number
  ) => {
    const url = `${
      SHOP_API.Shop
    }/${shopId}/products?Page=${pageIndex}&PageSize=${10}&Sort=${sortType}&Status=${status}`;
    return axiosClient.get<IPagination<IProduct>>(url);
  },

  createListProduct: (listProduct: ISubmitProduct[], shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products/multiple`;
    return axiosClient.post(url, listProduct);
  },
};

export default productApi;
