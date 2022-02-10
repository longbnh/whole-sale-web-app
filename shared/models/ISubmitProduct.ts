interface ISubmitProduct {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  originId: number;
  brandId: number;
  categoryId: number;
  productImages?: string[];
}

export default ISubmitProduct;
