import React, { useState, useEffect } from "react";

import brandApi from "../../../api/brandApi";
import categoryApi from "../../../api/categoryAPI";
import IBrand from "../../models/IBrand";
import ICategory from "../../models/ICategory";
import AddProduct from "./AddProduct";

const ShopProduct = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [brand, setBrand] = useState<IBrand[]>([]);
  const getCategoryList = async () => {
    const response = await categoryApi.getCategory();
    setCategory(response.data);
  };

  const getBrandList = async () => {
    const response = await brandApi.getBrand();
    setBrand(response.data);
  };

  useEffect(() => {
    getCategoryList();
    getBrandList();
  }, []);
  return <AddProduct categories={category} brands={brand} />;
};

export default ShopProduct;
