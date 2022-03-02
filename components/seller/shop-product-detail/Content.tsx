import React, {useState} from "react";
import {ArrowCircleLeftIcon} from "@heroicons/react/solid";
import {Box, Button, Tab, Tabs} from "@mui/material";
import {useRouter} from "next/router";
import useSWR from "swr";
import productApi from "../../../api/productApi";
import GeneralInfo from "./GeneralInfo";

const Content = () => {
    const router = useRouter();
    const {id} = router.query;
    const [tabIndex, setTabIndex] = useState<number>(0);
    const {data, error} = useSWR([
        id,
    ], productApi.getProduct, {
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
            className="relative bg-gray-100 py-5 w-full ml-56 min-h-screen"
        >
            <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div
                    className="flex bg-white mx-4 mt-5 h-auto border rounded-xl px-5 py-2 items-center justify-start gap-5">
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

            <div
                className="bg-white mx-8 mt-5 p-2 border rounded-xl overflow-y-auto overflow-x-hidden max-h-full">
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                        <Tab label="Thông tin cơ bản" {...a11yProps(0)} />
                        <Tab label="Cài đặt" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                {(tabIndex === 0) && data && <GeneralInfo data={data.data}/>}
            </div>

        </div>
    )
}
export default Content;