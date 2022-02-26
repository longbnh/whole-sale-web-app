import {IImage} from "./IImage";

export interface IProduct {
    id?: string
    name: string;
    description: string;
    originalPrice: number;
    originId?: number;
    brandId?: number;
    categoryId?: number;
    productImages?: Array<IImage> | string[];
    removeImages?: number[];
    status?: number;
}