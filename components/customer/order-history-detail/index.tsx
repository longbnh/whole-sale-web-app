import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Divider from "@mui/material/Divider";

import customerApi from "../../../api/customerApi";
import { IOrderCustomer } from "../../../shared/models/IOrder";
import InformationOrder from "./InformationOrder";
import PriceOrder from "./PriceOrder";
import Link from "next/link";

interface OrderHistoryDetailProps {}

const OrderHistoryDetail: React.FC<OrderHistoryDetailProps> = ({}) => {
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState<IOrderCustomer>();
  const id = router.query;

  const orderNumber = id.id && (id.id as string[]).join("/");
  const page = id.page === undefined ? 1 : id.page;

  const getOrderHistory = async () => {
    try {
      const response = await customerApi.getOrderHistoryByOrderName(
        orderNumber as string
      );
      setOrderHistory(response.data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getOrderHistory();
  }, [orderNumber]);

  return (
    <div className="mx-auto flex flex-col" style={{ width: "73%" }}>
      <div className=" bg-white rounded-lg p-6">
        <div className="flex mb-5 justify-between">
          <Link href={`/purchase?page=${page}`}>
            <div className="flex items-center cursor-pointer hover:opacity-75">
              <ArrowBackIosOutlinedIcon fontSize="small" />
              <div className="ml-3">Trở lại</div>
            </div>
          </Link>
          <div className="text-base flex">
            <div className="mr-2 text-red-400">Đơn hàng : {orderNumber}</div>
          </div>
        </div>
        <Divider />
        <InformationOrder orderHistory={orderHistory} />
        <Divider />
        {orderHistory && (
          <PriceOrder orderHistory={orderHistory as IOrderCustomer} />
        )}
      </div>
    </div>
  );
};

export default OrderHistoryDetail;
