export interface ISubCategory {
  id: number;
  name: string;
  priority: number;
}

interface ICategory {
  name: string;
  priority: number;
  subCategories: Array<ISubCategory>;
}

export default ICategory;
