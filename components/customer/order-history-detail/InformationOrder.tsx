import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";

import customerApi from "../../../api/customerApi";
import orderApi from "../../../api/orderApi";
import { IOrderCustomer } from "../../../shared/models/IOrder";
import CustomButton from "../../commons/CustomButton";
import ProcessStatusOrder from "../stepper/ProcessStatusOrder";

interface InformationOrderProps {
  orderHistory: IOrderCustomer | undefined;
  setClick: React.Dispatch<React.SetStateAction<boolean>>;
  click: boolean;
}

interface IContent {
  title: string;
  content: string;
  button: string;
  action?: () => void;
}

const InformationOrder: React.FC<InformationOrderProps> = ({
  orderHistory,
  setClick,
  click,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<IContent>({
    title: "",
    content: "",
    button: "",
  });
  const fullScreen = useMediaQuery(useTheme().breakpoints.down("md"));

  const handleClickOpenCancel = () => {
    let cancel: IContent = {
      title: "Xác nhận hủy đơn hàng",
      content: "Bạn có chắc muốn hủy đơn hàng này ?",
      button: "Xác nhận",
      action: handleCancelOrder,
    };
    setContent(cancel);
    setOpen(true);
  };

  const handleClickOpenRefund = () => {
    //thiếu api refund
    let refund: IContent = {
      title: "Xác nhận yêu cầu trả hàng / hoàn tiền",
      content: "Bạn có chắc muốn trả lại đơn hàng này và hoàn tiền ?",
      button: "Xác nhận",
      // action: ,
    };
    setContent(refund);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelOrder = () => {
    customerApi.cancelOrder(orderHistory!.orderNumber);
    setClick(!click);
    setOpen(false);
  };

  const handleUpdateReceived = () => {
    orderApi.updateReceivedStatus(orderHistory!.orderNumber);
    setClick(!click);
    setOpen(false);
  };

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
          {orderHistory &&
          (orderHistory.status === 6 ||
            orderHistory.status === 7 ||
            orderHistory.status === 12) ? ( // 6 7
            <div className="w-[151px]">
              <CustomButton
                disable={orderHistory.status === 12}
                content={
                  <div
                    className={classNames("w-[151px] font-light text-gray-50")}
                  >
                    Đã nhận hàng
                  </div>
                }
                size="large"
                color={orderHistory.status === 12 ? "#ed5c5c" : "#EF4444"}
                hoverColor="#ed1313"
                onClick={handleUpdateReceived}
              />
            </div>
          ) : (
            <></>
          )}
          {orderHistory &&
          (orderHistory.status === 2 ||
            orderHistory.status === 3 ||
            orderHistory.status === 4) ? (
            <div className="w-[151px] mt-5 border-2">
              <CustomButton
                disable={orderHistory?.status === 3}
                content={
                  <div
                    className={classNames("font-light", {
                      "text-black": orderHistory?.status !== 3,
                      "text-gray-500": orderHistory?.status === 3,
                    })}
                  >
                    Hủy đơn hàng
                  </div>
                }
                size="large"
                color="#00000"
                hoverColor="#F9FAFB"
                widthFull={true}
                boxShadow={false}
                onClick={handleClickOpenCancel}
              />
            </div>
          ) : (
            <></>
          )}
          {orderHistory &&
          (orderHistory.status === 5 ||
            orderHistory.status === 6 ||
            orderHistory.status === 7 ||
            orderHistory.status === 10) ? (
            <div className="mt-5 border-2">
              <CustomButton
                disable={orderHistory.status === 10}
                content={
                  <div
                    className={classNames("font-light", {
                      "text-black": orderHistory?.status !== 10,
                      "text-gray-500": orderHistory?.status === 10,
                    })}
                  >
                    Yêu cầu trả hàng / Hoàn tiền
                  </div>
                }
                size="large"
                color="#00000"
                hoverColor="#F9FAFB"
                widthFull={true}
                boxShadow={false}
                onClick={handleClickOpenRefund}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="border-l-2 pl-5">
        {orderHistory && <ProcessStatusOrder step={orderHistory.status} />}
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{content.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={content.action}>{content.button}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InformationOrder;
