import React from "react";
import { IOrderCustomer } from "../../../shared/models/IOrder";
import CustomButton from "../../commons/CustomButton";
import ProcessStatusOrder from "../stepper/ProcessStatusOrder";

interface InformationOrderProps {
  orderHistory: IOrderCustomer | undefined;
}

const InformationOrder: React.FC<InformationOrderProps> = ({
  orderHistory,
}) => {
  return (
    <div className="flex my-6">
      <div className="w-[60%]">
        <div className="text-xl font-semibold">Địa chỉ giao hàng</div>
        <div className="mt-5 ml-2">
          {orderHistory?.receiverDetails.receiverName}
        </div>
        <div className="mt-3 ml-2 text-sm opacity-80">
          {orderHistory?.receiverDetails.phoneNumber}
        </div>
        <div className="mt-3 ml-2 text-sm opacity-80">
          {orderHistory?.receiverDetails.detailAddress}{" "}
          {orderHistory?.receiverDetails.ward}{" "}
          {orderHistory?.receiverDetails.district}{" "}
          {orderHistory?.receiverDetails.city}
        </div>
        <div className="flex flex-col items-end m-4 pt-5">
          <div className="w-[151px]">
            <CustomButton
              content={"Đã nhận hàng"}
              size="large"
              color="#EF4444"
              hoverColor="#F80E5A"
            />
          </div>
          <div className="w-[151px] mt-5 border-2">
            <CustomButton
              disable={orderHistory?.status === 2 || orderHistory?.status === 4}
              content={
                <div className="text-black font-light">Hủy đơn hàng</div>
              }
              size="large"
              color="#00000"
              hoverColor="#F9FAFB"
              widthFull={true}
              boxShadow={false}
            />
          </div>
        </div>
      </div>
      <div className="border-l-2 pl-5">
        {orderHistory && <ProcessStatusOrder step={orderHistory.status} />}
      </div>
    </div>
  );
};

export default InformationOrder;
