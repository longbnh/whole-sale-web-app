import { Divider } from "@mui/material";
import React from "react";
import { ITotal } from ".";
import NumberFormat from "../../../utils/NumberFormat";
import CustomButtons from "../../commons/CustomButton";

interface TotalProps {
  listTotal: ITotal[];
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div className="rounded-lg bg-white p-6 ml-4 mb-4">
      <div className="font-medium text-lg mb-3">Thông tin chung</div>
      <Divider />
      <div className="flex my-3 font-base text-sm">
        <div className="">Tổng sản phẩm đã chọn</div>
        <div className="ml-auto ">{props.listTotal.length}</div>
      </div>
      <div className="flex my-3 font-base text-sm">
        <div className="">Tổng tạm tính</div>
        <div className="ml-auto ">
          {NumberFormat(
            props.listTotal.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.totalPrice,
              0
            )
          )}{" "}
          đ
        </div>
      </div>
      <Divider />
      <div className="flex my-3 font-base text-sm">
        <div className="font-medium text-xl mb-3 uppercase">Tổng cộng</div>
        <div className="ml-auto font-medium text-xl text-red-500">
          {NumberFormat(
            props.listTotal.reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.totalPrice,
              0
            )
          )}{" "}
          đ
        </div>
      </div>
      <div className="my-3">
        <CustomButtons
          content={"Đặt hàng"}
          size={"large"}
          borderRadius={12}
          widthFull={true}
          color={"#ff3e3e"}
          hoverColor={"#ff0b0b"}
        />
      </div>
    </div>
  );
};

export default Total;