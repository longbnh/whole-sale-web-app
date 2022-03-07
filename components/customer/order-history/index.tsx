import React, { useState } from "react";

import { Popover } from "@headlessui/react";
import { Divider, OutlinedInput, Paper, TextField } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import { vi } from "date-fns/locale";
import styled from "@emotion/styled";

import CustomButtons from "../../commons/CustomButton";
import OrderListItem from "./OrderListItem";

const styles = () => ({
  root: {
    "& $notchedOutline": {
      //   borderColor: "#d32f2f",
    },
    "&:hover $notchedOutline": {
      //   borderWidth: "#d32f2f",
    },
    "&$focused $notchedOutline": {
      borderColor: "#d32f2f",
    },
  },
  focused: {},
  notchedOutline: {},
});

const RedTextField = styled(TextField)(() => ({
  // input label when focused
  "& label.Mui-focused": {
    color: "#d32f2f",
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: "#d32f2f",
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "#d32f2f",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#d32f2f",
    },
  },
}));

interface OrderHistoryPageProps {}

const OrderHistoryPage = (
  props: OrderHistoryPageProps & WithStyles<typeof styles>
) => {
  const { classes } = props;
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <div className="mx-auto " style={{ width: "73%" }}>
      <div className=" bg-white rounded-lg">
        <div className="uppercase text-xl font-medium p-4">
          Tìm kiếm đơn hàng
        </div>
        <Divider />
        <div className="ml-3">
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
                        height: "85%",
                        borderRadius: 1,
                      }}
                      classes={classes}
                      placeholder="Tìm kiếm mã đơn hàng"
                      inputProps={{ "aria-label": "Tìm kiếm sản phẩm" }}
                    />
                  </Paper>
                </div>
              </div>
              <div className="w-1/4 flex justify-start items-center ml-7">
                <LocalizationProvider locale={vi} dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month"]}
                    label="Năm và tháng"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <RedTextField
                        size="small"
                        {...params}
                        helperText={null}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="w-1/4 flex justify-start items-center ml-10">
                <CustomButtons
                  content="Tìm kiếm"
                  borderRadius={4}
                  boxShadow={false}
                />
              </div>
            </div>
          </Popover>
        </div>
      </div>
      <OrderListItem />
    </div>
  );
};

export default withStyles(styles)(OrderHistoryPage);