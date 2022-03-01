import { SHOP_API } from "../shared/enum/enum";
import ISubmitProduct from "../shared/models/ISubmitProduct";
import axiosClient from "./axiosClient";
import { IProduct } from "../shared/models/IProduct";
import { IPagination } from "../shared/models/IPagination";
import { IRequestPage} from "../shared/models/IRequestPage";

const config = {
  headers: {
    "content-type": "application/json",
    accountId: 2,
  }
}
const productApi = {
  createProduct: (product: IProduct, shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products`;
    return axiosClient.post(url, product, config);
  },
  getProducts: (
    shopId: number,
    name?: string,
    pageRequest?: IRequestPage,
  ) => {
    const url = `${
      SHOP_API.Shop
    }/${shopId}/products`;
    const param = {
      ...pageRequest,
      name: name,
    }
    return axiosClient.get<IPagination<IProduct>>(url, {
      headers: {
        "content-type": "application/json",
        accountId: 2,
      },
      params: param,
    });
  },

  createListProduct: (listProduct: ISubmitProduct[], shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products/multiple`;
    return axiosClient.post(url, listProduct);
  },
};

export default productApi;
