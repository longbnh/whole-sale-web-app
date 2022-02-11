import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import ICategory from "../../../shared/models/ICategory";
import Category from "./Category";

const DashboardCustomer = () => {
  const [category, setCategory] = useState<ICategory[]>([]);

  const getCategoryList = async () => {
    const response = await categoryApi.getCategory();
    setCategory(response.data);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className="w-full relative">
      <div className="mx-auto bg-white mt-5" style={{ width: "1200px" }}>
        <Category categories={category} />
      </div>
    </div>
  );
};

export default DashboardCustomer;
