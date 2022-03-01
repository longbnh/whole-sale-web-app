import {IImage} from "./IImage";
import {ProductDisplayStatus} from "../type/paginationTypes";
import IBrand from "./IBrand";
import ICategory from "./ICategory";

export interface IProduct {
    id: string
    name: string;
    description: string;
    originalPrice: number;
    origin: string;
    brand: IBrand;
    category: ICategory;
    productImages: Array<IImage>;
    status: ProductDisplayStatus;
    statusString: string;
    createdAt: string;
    createBy: string;
}