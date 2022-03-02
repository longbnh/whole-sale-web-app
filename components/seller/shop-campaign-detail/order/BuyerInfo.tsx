import classNames from "classnames";
import React from "react";
import { IOrderSeller } from "../../../../shared/models/IOrder";

interface BuyerInfoProps {
  customer: IOrderSeller | undefined;
}

const BuyerInfo: React.FC<BuyerInfoProps> = ({ customer }) => {
  return (
    <div className="sticky top-0 self-start mt-4 min-h-full">
      <div className="text-2xl font-semibold text-center my-5">
        Thông tin người mua
      </div>
      <div className="flex text-lg font-base mx-3">
        <div className="w-36">Họ và tên :</div>
        <div className={classNames("", { hidden: customer === undefined })}>
          {customer?.receiverDetails.receiverName}
        </div>
      </div>
      <div className="flex text-lg font-base mx-3 my-4">
        <div className="w-36">Số điện thoại :</div>
        <div className={classNames("", { hidden: customer === undefined })}>
          {customer?.receiverDetails.phoneNumber}
        </div>
      </div>
      <div className="text-lg font-base mx-3">
        <div className="w-36">Địa chỉ liên lạc :</div>
        <div
          className={classNames("mt-3 ml-5", {
            hidden: customer === undefined,
          })}
        >
          {`${customer?.receiverDetails.detailAddress} ${customer?.receiverDetails.ward} ${customer?.receiverDetails.district} ${customer?.receiverDetails.city}`}
        </div>
      </div>
    </div>
  );
};

export default BuyerInfo;
