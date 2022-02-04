import React, { useState, useEffect } from "react";

import brandApi from "../../../api/brandApi";
import categoryApi from "../../../api/categoryApi";
import IBrand from "../../models/IBrand";
import ICategory from "../../models/ICategory";
import IOrigin from "../../models/IOrigin";
import AddProduct from "./AddProduct";
import originApi from "../../../api/originApi";

const ShopProduct = () => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [brand, setBrand] = useState<IBrand[]>([]);
  const [origin, setOrigin] = useState<IOrigin[]>([]);
  const getCategoryList = async () => {
    const response = await categoryApi.getCategory();
    setCategory(response.data);
  };

  const getBrandList = async () => {
    const response = await brandApi.getBrand();
    setBrand(response.data);
  };

  const getOriginList = async () => {
    const response = await originApi.getOrigin();
    setOrigin(response.data);
  }

  useEffect(() => {
    getCategoryList();
    getBrandList();
    getOriginList();
  }, []);
  return <AddProduct categories={category} brands={brand} origins={origin} />;
};

export default ShopProduct;
