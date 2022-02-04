import { SHOP_API } from "../components/enum";
import axiosClient from "./axiosClient";

interface Product {
  name: string;
  description: string;
  originalPrice: number;
}

const productApi = {
  createProduct: (product: Product, shopId: number) => {
    const url = SHOP_API.Shop;
    return axiosClient.post(url, product);
  },
};

export default productApi;
