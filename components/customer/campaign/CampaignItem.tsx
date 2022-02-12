import React, {useEffect, useState} from "react";
import {ICampaign} from "../../../shared/models/ICampaign";
import {Avatar, ButtonGroup, Divider, TextField} from "@mui/material";
import {getLastActiveMilestone, getMaxMilestone, getMergedMilestone} from "../../../shared/utils/CampaignUtils";
import CustomStepper from "../../commons/CustomStepper";
import Button from "@mui/material/Button";
import Countdown from "react-countdown";
import useSWR from "swr";
import campaignApi from "../../../api/campaignApi";
import {useRouter} from "next/router";
import 'react-slideshow-image/dist/styles.css'
import {Slide} from 'react-slideshow-image';
import ShowMoreText from "react-show-more-text";

interface CampaignItemProps {
    id: string | string[] | undefined;
}

// const campaign: ICampaign = {
//     id: 1,
//     startDate: '10/02/2022',
//     endDate: '20/02/2022',
//     currentSale: 32,
//     inStockQuantity: 100,
//     promotionPlanId: 0,
//     status: 0,
//     basicInfo: {
//         id: "1",
//         originalPrice: 50000,
//         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//         name: "Dien thoai",
//     },
//     milestones: [
//         {
//             price: 48000,
//             quantity: 20
//         },
//         {
//             price: 45000,
//             quantity: 40
//         },
//         {
//             price: 42000,
//             quantity: 60
//         },
//         {
//             price: 40000,
//             quantity: 80
//         },
//     ]
// }

interface TimeRenderProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
}

const renderer = (props: TimeRenderProps) => {
    return (
        <div className="text-4xl text-red-500 font-bold">
            {props.days} d &nbsp;
            <span>
        {props.hours}:{props.minutes}:{props.seconds}
      </span>
        </div>
    )
};

const CampaignItem = (props: CampaignItemProps) => {
    const [quantity, setQuantity] = useState(0);
    // const campaignId = props.id; hien chua co
    const router = useRouter();
    const {id} = router.query;

    const {data, error} = useSWR([
        id,
    ], campaignApi.getCampaign, {
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });

    const handleQuantityChange = (e: any, actionIndex: number) => {
        let q = quantity;
        switch (actionIndex) {
            case -1:
                setQuantity(q - 1);
                break;
            case +1:
                setQuantity(q + 1);
                break;
            case 0:
                setQuantity(e.target.value);
                break;
            default:
                break;
        }
    }

    function getDateObject(date: string): number {
        const time = Date.parse(date);
        return time;
    }

    return (
        <div>
            <div className="bg-white mt-5 mx-auto w-5/6 overflow-y-auto overflow-x-hidden max-h-full">
                <div className="flex flex-col align-center gap-5 justify-start p-4 mt-20 ml-5">
                    <div className="grid grid-cols-12">
                        <div className="col-start-1 col-span-4">
                            {data && <div className="slide-container mt-20">
                                <Slide>
                                    {data.data.images.map((image, index) => (
                                        <div className="each-slide" key={index}>
                                            <img src={image.url}/>
                                        </div>
                                    ))}
                                </Slide>
                            </div>}
                        </div>
                        <div className="col-span-8 col-start-6 mt-16">
                <span className="text-4xl font-bold">
                    {data?.data.name}
                </span>
                            <Divider variant="middle" className="pl-0 mt-3 mb-16"/>
                            <div className="w-full">
                                {data?.data && <CustomStepper
                                    milestones={getMergedMilestone(data.data)}
                                    activeMilestone={getLastActiveMilestone(data.data)}
                                    progress={data.data.currentSaleQuantity}
                                    maxValue={getMaxMilestone(data.data)}
                                />}

                            </div>
                            <div className="h-32 mt-16">
                                <Button onClick={(e) => handleQuantityChange(e, -1)}
                                        variant="outlined"
                                        style={{fontSize: '30px'}}
                                        className="h-16 w-16">
                                    -
                                </Button>
                                <TextField onChange={(e) => handleQuantityChange(e, 0)}
                                           value={quantity}
                                           className="mx-5 h-16 w-16"
                                           sx={{
                                               '& .MuiInputBase-root': {
                                                   height: "inherit"
                                               },
                                           }}
                                           InputProps={{
                                               inputProps: {
                                                   style: {textAlign: "center", fontSize: "20px"},
                                               }
                                           }}>
                                </TextField>
                                <Button onClick={(e) => handleQuantityChange(e, +1)}
                                        variant="outlined"
                                        style={{fontSize: '30px'}}
                                        className="h-16 w-16">
                                    +
                                </Button>
                                <Button onClick={(e) => handleQuantityChange(e, +1)}
                                        variant="outlined"
                                        style={{fontSize: '20px', backgroundColor: "#ff0000", color: "#FFFFFF"}}
                                        className="h-16 w-auto ml-16">
                                    Thêm Vào Giỏ Hàng
                                </Button>
                            </div>
                            {data &&
                            <div className="flex justify-center">
                                <div className="flex flex-col">
                        <span className="text-2xl font-bold mb-5">
                        Thời gian còn lại:
                    </span>
                                    <Countdown date={getDateObject(data.data.endDate)} renderer={renderer}/>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-5 mx-auto w-5/6 max-h-full">
                {data && <div className="flex flex-row p-5 gap-10">
                    <Avatar alt="shop avatar" src={data.data.shop.avatarUrl} sx={{width: 100, height: 100}}/>
                    <div className="flex flex-col">
                        <div className="text-2xl">
                            {data.data.shop.shopName}
                        </div>
                        <div>
                            {"{Sẽ thêm đánh giá ở đây sau}"}
                        </div>
                    </div>
                </div>}
            </div>
            {data && <div className="bg-white mt-5 mx-auto w-5/6 max-h-full p-5 mb-5">
                <div className="grid grid-rows-1">
                    <span className=" text-2xl font-bold mb-16">
                        Thông tin sản phẩm:
                    </span>
                </div>
                <div className="grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2">
                            <span className="font-bold text-xl">
                        Tên sản phẩm:
                    </span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-xl">
                                {data.data.name}
                    </span>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" className="pl-0 mt-5 mb-5"/>
                <div className="grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2">
                            <span className="font-bold text-xl">
                        Xuất xứ:
                    </span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-xl">
                                {data.data.origin}
                    </span>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" className="pl-0 mt-5 mb-5"/>
                <div className="grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2">
                            <span className="font-bold text-xl">
                        Thương hiệu:
                    </span>
                        </div>
                        <div className="col-span-2">
                            <span className="text-xl">
                                {data.data.brand.name}
                    </span>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" className="pl-0 mt-5 mb-16"/>
                <span className=" text-2xl font-bold mb-10">
                        Mô tả sản phẩm:
                    </span>
                <ShowMoreText
                    lines={3}
                    more="Xem thêm"
                    less="Ẩn bớt"
                    className="content-css w-full text-xl mt-5"
                    anchorClass="my-anchor-css-class text-blue-600"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    {data.data.description}
                </ShowMoreText>
            </div>}
        </div>
    );
};

export default CampaignItem;
