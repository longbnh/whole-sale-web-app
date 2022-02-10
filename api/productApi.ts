import { SHOP_API } from "../shared/enum/enum";
import ISubmitProduct from "../shared/models/ISubmitProduct";
import axiosClient from "./axiosClient";

export interface Product {
  name: string;
  description: string;
  originalPrice: number;
  originId: number;
  brandId: number;
  categoryId: number;
  productImages?: Array<string>;
  removeImages?: number[];
}

const productApi = {
  createProduct: (product: Product, shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products`;
    return axiosClient.post(url, product);
  },

  createListProduct: (listProduct: ISubmitProduct[], shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products/multiple`;
    return axiosClient.post(url, listProduct);
  },
};

export default productApi;
