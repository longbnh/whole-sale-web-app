import Image from "next/image";
import React from "react";
import { IOrderCustomer } from "../../../shared/models/IOrder";
import { getLastActiveMilestone } from "../../../utils/CampaignUtils";
import NumberFormat from "../../../utils/NumberFormat";

interface PriceOrderProps {
  orderHistory: IOrderCustomer;
}

const PriceOrder: React.FC<PriceOrderProps> = ({ orderHistory }) => {
  let originPrice = orderHistory?.campaign!.mileStones.find(
    (item) => item.milestoneNumber === 0
  )?.price;

  let activeMileStone = getLastActiveMilestone(orderHistory?.campaign);
  let currentPrice = orderHistory?.campaign.mileStones.find(
    (item) => item.milestoneNumber === activeMileStone
  )?.price;
  let refund = orderHistory!.priceEach - (currentPrice as number);
  return (
    <div className="mt-6">
      <div className="flex my-2 w-full">
        <Image src={orderHistory!.campaign.imageUrl!} width={80} height={80} />
        <div className="mt-2 ml-10 w-1/2">
          <div className="text-lg">{orderHistory!.campaign.name}</div>
          <div>
            <div>x{orderHistory!.quantity}</div>
          </div>
        </div>
      </div>
      <div className="flex mb-8">
        <div className="w-[60%] border-r-2 pr-4">
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            Giá gốc
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            Giá kết thúc
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            Giá thanh toán
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            Tổng số tiền
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            Điểm hoàn trả
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            Phương thức thanh toán
          </div>
        </div>
        <div className="w-[40%]">
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            {NumberFormat(originPrice as number)} đ
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            {NumberFormat(currentPrice as number)} đ
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            {NumberFormat(orderHistory!.priceEach * orderHistory!.quantity)} đ
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5 text-2xl text-red-600">
            {NumberFormat(orderHistory!.priceEach * orderHistory!.quantity)} đ
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            {NumberFormat(refund as number)} đ
          </div>
          <div className="flex justify-end border-b-2 border-dotted py-1.5">
            {orderHistory?.paymentTypeString}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceOrder;
