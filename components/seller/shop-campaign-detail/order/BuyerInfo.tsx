import React from "react";

interface BuyerInfoProps {}

const BuyerInfo: React.FC<BuyerInfoProps> = ({}) => {
  return (
    <div className="sticky top-0 self-start mt-4 min-h-full">
      <div className="text-2xl font-semibold text-center my-5">
        Thông tin người mua
      </div>
      <div className="flex text-lg font-base mx-3">
        <div className="w-32">Họ và tên :</div>
      </div>
      <div className="flex text-lg font-base mx-3 my-4">
        <div className="w-32">Số điện thoại :</div>
      </div>
      <div className="flex text-lg font-base mx-3">
        <div className="w-32">Địa chỉ liên lạc :</div>
      </div>
    </div>
  );
};

export default BuyerInfo;
