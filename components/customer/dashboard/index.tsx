import React, { useEffect, useState } from "react";
import categoryApi from "../../../api/categoryApi";
import ICategory from "../../../shared/models/ICategory";
import Category from "./Category";
import Hotdeal from "./Hotdeal";

import dashboard from "../../../public/json/dashboard.json";

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
      <div className="mx-auto bg-white mt-5 rounded-lg w-1200">
        <Category categories={category} />
      </div>
      <div className="mx-auto bg-white my-5 rounded-lg w-1200">
        <Hotdeal
          title={
            <h3
              className="text-3xl font-semibold text-black absolute top-5 "
              style={{ left: "25.1%" }}
            >
              Deal ngon
            </h3>
          }
          imgLink={
            dashboard.find((item) => item.content === "hotDeal")?.imgLink || ""
          }
        />
      </div>
      <div className="mx-auto bg-white my-5 rounded-lg w-1200">
        <Hotdeal
          title={
            <h3
              className="text-3xl font-semibold text-black absolute top-5 "
              style={{ left: "30%" }}
            >
              Gần bạn
            </h3>
          }
          imgLink={
            dashboard.find((item) => item.content === "nearBy")?.imgLink || ""
          }
        />
      </div>
    </div>
  );
};

export default DashboardCustomer;
