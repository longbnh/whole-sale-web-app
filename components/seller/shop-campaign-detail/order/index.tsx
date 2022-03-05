import { Divider, OutlinedInput, Paper } from "@mui/material";
import { Popover } from "@headlessui/react";
import { withStyles, WithStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import campaignApi from "../../../../api/campaignApi";
import { ICampaign } from "../../../../shared/models/ICampaign";
import { IOrderSeller } from "../../../../shared/models/IOrder";
import { IPagination } from "../../../../shared/models/IPagination";
import BuyerInfo from "./BuyerInfo";
import OrderItem from "./OrderItem";
import CustomButtons from "../../../commons/CustomButton";

interface OrderProps {
  data: ICampaign;
}

const styles = () => ({
  root: {
    "& $notchedOutline": {
      borderColor: "#d32f2f",
    },
    "&:hover $notchedOutline": {
      borderWidth: "#d32f2f",
    },
    "&$focused $notchedOutline": {
      borderColor: "#d32f2f",
    },
  },
  focused: {},
  notchedOutline: {},
});

const Order = (props: OrderProps & WithStyles<typeof styles>) => {
  const [page, setPage] = useState<number>(1);
  const [pageCampaign, setPageCampaign] = useState<IPagination<IOrderSeller>>();
  const [customer, setCustomer] = useState<IOrderSeller>();

  const { classes } = props;

  const getOrderSeller = async () => {
    const res = await campaignApi.getOrderByCampaign(props.data.id, {
      page: 1,
      pageSize: 10,
    });
    setPageCampaign(res.data);
  };

  useEffect(() => {
    getOrderSeller();
  }, [page]);

  return (
    <div className="mx-4 min-h-screen ">
      <div className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
        <Popover className={"h-20"}>
          <div className=" w-full py-3 h-full flex">
            <div className="w-full xl:w-2/4 lg:w-1/3 flex justify-start items-center">
              <div className="h-4/5 w-full mx-auto flex items-center">
                <Paper
                  component="form"
                  sx={{
                    boxShadow: "none",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <OutlinedInput
                    sx={{
                      ml: 1,
                      flex: 1,
                      borderColor: "red",
                      height: "82%",
                      borderRadius: 0,
                    }}
                    classes={classes}
                    placeholder="Tìm kiếm mã đơn hàng"
                    inputProps={{ "aria-label": "Tìm kiếm sản phẩm" }}
                  />
                  <CustomButtons
                    content="Tìm kiếm"
                    borderRadius={0}
                    boxShadow={false}
                  />
                </Paper>
              </div>
            </div>
            <div className="w-fit flex items-center ml-20">Trạng thái</div>
          </div>
        </Popover>
        <Divider />
        <div className="flex relative h-fit">
          <div className="w-70% min-h-screen border-r-2 mr-3">
            {pageCampaign && pageCampaign.totalElements! > 0 ? (
              pageCampaign.content.map((item, key) => {
                return (
                  <OrderItem
                    key={key}
                    data={item}
                    setCustomer={setCustomer}
                    customer={customer}
                  />
                );
              })
            ) : (
              // <>{pageCampaign.content.at(0)?.orderNumber}</>
              <>Không có dữ liệu</>
            )}
          </div>
          <div className="w-30% relative flex">
            <BuyerInfo customer={customer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Order);
