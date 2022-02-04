import { SHOP_API } from "../components/enum";
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
};

export default productApi;
