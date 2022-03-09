import React, { useState } from "react";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import campaignApi from "../../../api/campaignApi";
import GeneralInfo from "./GeneralInfo";
import SaleInfo from "./SaleInfo";
import Setting from "./Setting";
import Order from "./order";

const Content = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { data, error } = useSWR([id], campaignApi.getCampaignForSeller, {
    revalidateOnFocus: true,
    refreshInterval: 5000,
  });

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  }

  return (
    <div className="bg-gray-100 py-5 w-full ml-56 flex flex-col min-h-screen">
      <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
        <div className="flex bg-white mx-4 mt-5 max-h-full border rounded-xl px-5 py-2 items-center justify-start gap-5">
          <Button
            variant="text"
            onClick={() => router.back()}
            startIcon={
              <ArrowCircleLeftIcon className="h-10 w-10 text-red-500" />
            }
          >
            <span className="text-xl">Quay Lại</span>
          </Button>
          {data && (
            <div className="text-xl">
              SẢN PHẨM: {data.data.name.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="mx-4 overflow-y-auto overflow-x-hidden">
        <div className="bg-white mx-4 mt-5 p-2 max-h-full border rounded-xl">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
              <Tab label="Dữ liệu kinh doanh" {...a11yProps(1)} />
              <Tab label="Đơn đặt hàng" {...a11yProps(2)} />
              <Tab label="Cài đặt" {...a11yProps(3)} />
            </Tabs>
          </Box>
        </div>
      </div>
      <div className="grow">
        {tabIndex === 0 && data && <GeneralInfo data={data.data} />}
        {tabIndex === 1 && data && <SaleInfo data={data.data} />}
        {tabIndex === 2 && data && <Order data={data.data} />}
        {tabIndex === 3 && data && <Setting data={data.data} />}
      </div>
    </div>
  );
};
export default Content;
