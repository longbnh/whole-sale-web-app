import { SHOP_API } from "../components/enum";
import axiosClient from "./axiosClient";

interface Product {
  name: string;
  description: string;
  originalPrice: number;
  originId: number;
  brandId: number;
  categoryId: number;
  newImages?: string[];
  removeImages?: number[];
}

const productApi = {
  createProduct: (product: Product, shopId: number) => {
    const url = SHOP_API.Shop;
    return axiosClient.put(url, product);
  },
};

export default productApi;
