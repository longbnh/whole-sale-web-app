export interface ISubCategory {
  id: number;
  name: string;
  imageUrl: string;
  priority: number;
}

interface ICategory {
  name: string;
  priority: number;
  imageUrl: string;
  iconUrl: string;
  subCategories: Array<ISubCategory>;
}

export default ICategory;
