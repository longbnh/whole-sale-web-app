import React, { useEffect, useState } from "react";

import Content from "./Content";
import categoryApi from "../../../api/categoryApi";
import ICategory from "../../../shared/models/ICategory";
import IBrand from "../../../shared/models/IBrand";
import IOrigin from "../../../shared/models/IOrigin";
import brandApi from "../../../api/brandApi";
import originApi from "../../../api/originApi";

const AddListProduct = () => {
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
  };

  useEffect(() => {
    getCategoryList();
    getBrandList();
    getOriginList();
  }, []);

  return <Content categories={category} brands={brand} origins={origin} />;
};

export default AddListProduct;