export interface IProduct {
    name?: string;
    description?: string;
    originalPrice?: number;
    originId?: number;
    brandId?: number;
    categoryId?: number;
    newImages?: string[]
    removeImages?: number[];
    productImages?: string[];
}
