import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { Popover } from "@headlessui/react";
import { makeStyles, withStyles, WithStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import classNames from "classnames";

import campaignApi from "../../../../api/campaignApi";
import { ICampaign } from "../../../../shared/models/ICampaign";
import { IOrderSeller } from "../../../../shared/models/IOrder";
import { IPagination } from "../../../../shared/models/IPagination";
import BuyerInfo from "./BuyerInfo";
import OrderItem from "./OrderItem";
import CustomButtons from "../../../commons/CustomButton";
//@ts-ignore
import orderStatus from "../../../../public/json/orderStatus.json";

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
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState(0);
  const [statusId, setStatusId] = useState<number>(1);

  const { classes } = props;

  const getOrderSeller = async () => {
    const res = await campaignApi.getOrderByCampaign(props.data.id, {
      page: page,
      pageSize: 10,
    });
    setPageCampaign(res.data);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = async () => {
    const res = await campaignApi.getOrderByCampaign(
      props.data.id,
      {
        page: 1,
        pageSize: 10,
      },
      search,
      statusId
    );
    setPageCampaign(res.data);
    setPage(1);
  };

  useEffect(() => {
    getOrderSeller();

    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  const handleChange = (event: SelectChangeEvent) => {
    setStatusId(Number.parseInt(event.target.value as string));
  };

  return (
    <div className="mx-4 relative min-h-screen">
      <div className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
        <Popover className={"h-20"}>
          <div className=" w-full py-3 h-full flex">
            <div className="w-2/5 flex justify-start items-center">
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
                    onChange={handleChangeSearch}
                  />
                </Paper>
              </div>
            </div>
            <div className="w-36 flex items-center ml-14">
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  size="small"
                  id="status"
                  label="Trạng thái"
                  value={statusId.toString()}
                  onChange={handleChange}
                >
                  {orderStatus.map((item, key) => {
                    return (
                      <MenuItem key={key} value={item.statusId}>
                        {item.vn}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="w-1/4 flex justify-start items-center ml-14">
              <CustomButtons
                content="Tìm kiếm"
                borderRadius={4}
                boxShadow={false}
                onClick={handleSearch}
              />
            </div>
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
          <div
            className={classNames("w-30% flex", {
              "fixed -right-16 top-11": offset >= 316,
            })}
          >
            <BuyerInfo customer={customer} />
          </div>
        </div>
        <div className="w-70% flex justify-end pr-5">
          {pageCampaign && pageCampaign.content.length > 0 && (
            <div className="flex justify-end mt-16">
              <Stack spacing={2}>
                <Pagination
                  count={pageCampaign!.totalPage}
                  page={page}
                  onChange={(e, page) => setPage(page)}
                  variant="outlined"
                  shape="rounded"
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Order);
