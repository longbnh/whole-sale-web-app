import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import NumberFormat from "../../../../utils/NumberFormat";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
}));

interface OrderItemProps {}

const OrderItem: React.FC<OrderItemProps> = ({}) => {
  const classes = useStyles();

  return (
    <div>
      <div className="flex items-center my-2">
        <div className="text-xl font-semibold">Đơn hàng : </div>
        <div className="text-lg font-normal mx-2">
          1cb31c8a-65c3-43a0-a2e8-b8f001e3189e
        </div>
      </div>
      <div className="flex">
        {/* Giá */}
        <div className="w-1/3 border-r-2">
          <div className="flex justify-between">
            <div className="flex flex-col font-medium gap-1">
              <div>Giá thanh toán</div>
              <div>Số lượng</div>
              <div>Tổng</div>
            </div>
            <div className="flex flex-col items-end font-medium mr-3 gap-1">
              <div>{NumberFormat(150000)} đ</div>
              <div>5</div>
              <div className="text-red-500 font-semibold">
                {NumberFormat(150000)} đ
              </div>
            </div>
          </div>
        </div>
        {/* Ngày */}
        <div className="w-1/3 border-r-2 mx-2">
          <div className="flex">
            <div className="flex w-32 flex-col font-medium gap-1">
              <div>Ngày tạo</div>
              <div>Ngày cập nhật</div>
            </div>
            <div className="flex flex-col font-medium mr-3 gap-1">
              <div>22/02/2022</div>
              <div>22/02/2022</div>
            </div>
          </div>
        </div>
        {/* Trạng thái */}
        <div className="w-1/3">
          <div className="flex items-center">
            <div className="flex w-24 flex-col font-medium gap-2">
              <div>Đã đóng gói</div>
              <div className="text-xl">Trạng thái</div>
            </div>
            <div className="flex flex-col font-medium mr-3">
              <Checkbox
                classes={{ root: classes.root }}
                color="default"
                size="small"
              />
              <div className="text-xl text-red-500 mb-1.5 ml-3">Hoàn tất</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
