import React, {useState} from "react";
import {ArrowCircleLeftIcon, ArrowCircleUpIcon} from "@heroicons/react/solid";
import {Box, Button, IconButton, Tab, Tabs} from "@mui/material";
import {useRouter} from "next/router";
import useSWR from "swr";
import campaignApi from "../../../api/campaignApi";
import Tab0 from "./Tab-0";
import Tab1 from "./Tab-1";
import Tab3 from "./Tab-3";

const Content = () => {
    const router = useRouter();
    const {id} = router.query;
    const [tabIndex, setTabIndex] = useState<number>(0);
    const {data, error} = useSWR([
        id,
    ], campaignApi.getCampaignForSeller, {
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <div
            className="relative bg-gray-100 min-h-screen h-full overflow-y-auto overflow-x-hidden py-5"
        >
            <div className="mx-4 max-h-full">
                <div
                    className="flex bg-white mx-4 mt-5 max-h-full border rounded-xl px-5 py-2 items-center justify-start gap-5">
                    <Button variant="text"
                            onClick={() => router.back()}
                            startIcon={
                                <ArrowCircleLeftIcon
                                    className="h-10 w-10 text-red-500"
                                />}>
                        <span className="text-xl">Quay Lại</span>
                    </Button>
                    {data && <div className="text-xl">
                        SẢN PHẨM: {data.data.name.toUpperCase()}
                    </div>}
                </div>
            </div>

            <div className="mx-4 max-h-full">
                <div
                    className="bg-white mx-4 mt-5 p-2 max-h-full border rounded-xl">
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
                            <Tab label="Dữ liệu kinh doanh" {...a11yProps(1)} />
                            <Tab label="Đơn đặt hàng" disabled {...a11yProps(2)} />
                            <Tab label="Cài đặt" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                </div>
            </div>
            {(tabIndex === 0) && data && <Tab0 data={data.data}/>}
            {(tabIndex === 1) && data && <Tab1 data={data.data}/>}
            {(tabIndex === 3) && data && <Tab3 data={data.data}/>}

        </div>
    )
}
export default Content;