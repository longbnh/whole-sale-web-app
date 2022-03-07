import { SHOP_API } from "../shared/enum/enum";
import ISubmitProduct from "../shared/models/ISubmitProduct";
import axiosClient from "./axiosClient";
import { IProduct } from "../shared/models/IProduct";
import { IPagination } from "../shared/models/IPagination";
import { IRequestPage } from "../shared/models/IRequestPage";
import { IProduct as IProductRequest } from "../shared/models/modifyApi/IProduct";

const config = {
  headers: {
    "content-type": "application/json",
    accountId: 2,
  },
};
const productApi = {
  createProduct: (product: IProductRequest, shopId: number) => {
    const url = `${SHOP_API.Shop}/${shopId}/products`;
    return axiosClient.post<IProduct>(url, product, config);
  },
  updateProduct: (product: IProductRequest, productId: number) => {
    const url = `${SHOP_API.Product}/${productId}`;
    const param = {
      productId: productId,
    };
    return axiosClient.put<IProduct>(url, product, {
      ...config,
      params: param,
    });
  },
  getProduct: (productId: number) => {
    const url = `${SHOP_API.Product}/${productId}`;

    return axiosClient.get<IProduct>(url, config);
  },
  getProducts: (
    shopId: number,
    name?: string,
    categoryId?: number,
    pageRequest?: IRequestPage
  ) => {
    const url = `${SHOP_API.Shop}/${shopId}/products`;
    const param = {
      ...pageRequest,
      name: name,
    };
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

  downloadFileImport: () => {
    const url = `${SHOP_API.Product}${SHOP_API.Template}`;
    return axiosClient.get(url);
  },
};

export default productApi;
