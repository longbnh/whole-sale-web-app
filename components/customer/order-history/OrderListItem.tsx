import { Divider, Tooltip } from "@mui/material";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";

import Image from "next/image";
import React from "react";

import { IOrderCustomer } from "../../../shared/models/IOrder";
import NumberFormat from "../../../utils/NumberFormat";
import CustomButtons from "../../commons/CustomButton";
import orderStatus from "../../../public/json/orderStatus.json";
import { getLastActiveMilestone } from "../../../utils/CampaignUtils";
import Link from "next/link";

interface OrderListItemProps {
  page: number;
  order: IOrderCustomer;
}

const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  let originPrice = order.campaign!.mileStones.find(
    (item) => item.milestoneNumber === 0
  )?.price;

  let activeMileStone = getLastActiveMilestone(order.campaign);
  let currentPrice = order.campaign!.mileStones.find(
    (item) => item.milestoneNumber === activeMileStone
  )?.price;
  let refund = order.priceEach - (currentPrice as number);

  return (
    <div className="bg-white rounded-md mt-3 p-4">
      <div className="flex justify-between mb-1">
        <div className="text-base tracking-wider font-semibold">
          Shop: {order.shop.shopName}
        </div>
        <div className="text-red-600 font-medium">
          {orderStatus.find((item) => item.statusId === order.status)!.vn}
        </div>
      </div>
      <Divider />
      <Link href={`/purchase/${order.orderNumber}?page=5`}>
        <div className="flex my-2 w-full cursor-pointer hover:opacity-75">
          <Image src={order.campaign.imageUrl!} width={80} height={80} />
          <div className="mt-2 ml-10 w-1/2">
            <div className="text-lg">{order.campaign.name}</div>
            <div className="text-sm text-gray-600 mt-2">
              Mã đơn: {order.orderNumber}
            </div>
          </div>
          <div className="items-center justify-between flex w-1/3 ml-5">
            <div>x{order.quantity}</div>
            <div>
              <div className="flex">
                <div className="line-through text-gray-400 text-base">
                  ₫{NumberFormat(originPrice as number)}
                </div>
                <div className="text-red-600 ml-3">
                  ₫{NumberFormat(order.priceEach)}
                </div>
              </div>
              <div className="pt-1.5 pl-14">
                <Tooltip title="Tiền hoàn trả">
                  <CurrencyExchangeOutlinedIcon
                    fontSize="small"
                    className="mr-2"
                  />
                </Tooltip>
                ₫{NumberFormat(refund)}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <Divider />
      <div className="mt-2 flex w-full justify-end text-lg">
        Tổng số tiền:
        <div className="text-red-600 text-xl ml-5">
          {NumberFormat(order.quantity * order.priceEach)}đ
        </div>
      </div>
      <div className="mt-2 flex w-full justify-end text-lg">
        <CustomButtons
          content={"Đánh giá"}
          color="#EF4444"
          onClick={() => console.log("ok")}
        />
      </div>
    </div>
  );
};

export default OrderListItem;
