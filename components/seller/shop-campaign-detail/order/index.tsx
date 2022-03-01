import { Divider } from "@mui/material";
import React from "react";
import BuyerInfo from "./BuyerInfo";
import OrderItem from "./OrderItem";

const Order = () => {
  return (
    <div className="mx-4 min-h-screen ">
      <div className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
        <div className="mb-3">Trạng thái</div>
        <Divider />
        <div className="flex relative h-fit">
          <div className="w-70% min-h-screen border-r-2 mr-3">
            <OrderItem />
          </div>
          <div className="w-30% relative flex">
            <BuyerInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
