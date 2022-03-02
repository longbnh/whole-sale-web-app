import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
import moment from "moment";
import React from "react";
import { IOrderSeller } from "../../../../shared/models/IOrder";
import NumberFormat from "../../../../utils/NumberFormat";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
}));

interface OrderItemProps {
  data: IOrderSeller;
  setCustomer: React.Dispatch<React.SetStateAction<IOrderSeller | undefined>>;
}

const OrderItem: React.FC<OrderItemProps> = ({ data, setCustomer }) => {
  const classes = useStyles();

  data.orderTimes.sort((a, b) => a.dateType - b.dateType);

  const handleChose = () => {
    setCustomer(data);
  };

  return (
    <div className="cursor-pointer" onClick={handleChose}>
      <div className="flex items-center my-2">
        <div className="text-xl font-semibold">Đơn hàng : </div>
        <div className="text-lg font-normal mx-2">{data.orderNumber}</div>
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
              <div>{NumberFormat(data.priceEach)} đ</div>
              <div>{data.quantity}</div>
              <div className="text-red-500 font-semibold">
                {NumberFormat(data.totalPrice)} đ
              </div>
            </div>
          </div>
        </div>
        {/* Ngày */}
        <div className="w-1/3 border-r-2 mx-2">
          <div className="flex">
            <div className="flex w-32 flex-col font-medium gap-1">
              <div>Ngày tạo</div>
              <div>Ngày thanh toán</div>
              <div
                className={classNames("", {
                  hidden:
                    data.orderTimes.find((item) => item.dateType > 1) ===
                    undefined,
                })}
              >
                Ngày cập nhật
              </div>
            </div>
            <div className="flex flex-col font-medium mr-3 gap-1">
              <div>
                {moment(
                  data.orderTimes.find((item) => item.dateType === 0)?.time
                ).format("DD/MM/YYYY")}
              </div>
              <div>
                {moment(
                  data.orderTimes.find((item) => item.dateType === 1)?.time
                ).format("DD/MM/YYYY")}
              </div>
              <div
                className={classNames("", {
                  hidden:
                    data.orderTimes.find((item) => item.dateType > 1) ===
                    undefined,
                })}
              >
                {data.orderTimes.find((item) => item.dateType > 1) &&
                  moment(
                    data.orderTimes.at(data.orderTimes.length - 1)?.time
                  ).format("DD/MM/YYYY")}
              </div>
            </div>
          </div>
        </div>
        {/* Trạng thái */}
        <div className="w-1/3">
          <div className="flex items-center">
            <div className="flex w-24 flex-col font-medium gap-2">
              {/* <div>Đã đóng gói</div> */}
              <div className="text-xl">Trạng thái</div>
            </div>
            <div className="flex flex-col font-medium mr-3">
              {/* <Checkbox
                classes={{ root: classes.root }}
                color="default"
                size="small"
              /> */}
              <div className="text-xl text-red-500">Hoàn tất</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
