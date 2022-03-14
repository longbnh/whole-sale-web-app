import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import customerApi from "../../../api/customerApi";
import { IOrderCustomer } from "../../../shared/models/IOrder";
import InformationOrder from "./InformationOrder";

interface OrderHistoryDetailProps {}

const OrderHistoryDetail: React.FC<OrderHistoryDetailProps> = ({}) => {
  const router = useRouter();
  const [orderHistory, setOrderHistory] = useState<IOrderCustomer>();
  const id = router.query;

  const orderNumber = id.id && (id.id as string[]).join("/");
  const page = id.page;

  console.log(orderHistory);

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
        {/* <button onClick={() => router.back()}>back</button> */}
        <InformationOrder orderHistory={orderHistory} />
      </div>
    </div>
  );
};

export default OrderHistoryDetail;
