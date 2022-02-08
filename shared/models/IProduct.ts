export interface IProduct {
    name?: string;
    description?: string;
    originalPrice?: number;
    originId?: number;
    brandId?: number;
    categoryId?: number;
    productImages?: Array<string>;
    removeImages?: number[];
}