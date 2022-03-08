import {IImage} from "./IImage";
import {ProductDisplayStatus} from "../type/paginationTypes";
import IBrand from "./IBrand";
import IOrigin from "./IOrigin";

export interface IProduct {
    id: string
    name: string;
    description: string;
    originalPrice: number;
    origin: IOrigin;
    brand: IBrand;
    category: IProductCategory;
    productImages: Array<IImage>;
    status: ProductDisplayStatus;
    statusString: string;
    createdAt: string;
    createBy: string;
}

export interface IProductCategory {
    id: number;
    name: string;
    priority: number;
    imageUrl: string;
    iconUrl: string;
}