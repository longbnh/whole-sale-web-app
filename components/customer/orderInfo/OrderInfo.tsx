import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {getCurrentPrice} from "../../../utils/CampaignUtils";
import Button from "@mui/material/Button";
import React from "react";
import {useRouter} from "next/router";
import {ICampaign} from "../../../shared/models/ICampaign";

interface orderInfo {
    campaignId: number;
    quantity: number;
}

interface OrderInfoProps {
    campaignsInfo: ICampaign[],
    orderInfo: orderInfo[],
    handleClick: (e: any) => void,
}
export const OrderInfo: React.FC<OrderInfoProps> = ({campaignsInfo, orderInfo, handleClick}) => {
    const router = useRouter();

    function getListItem(campaign: ICampaign, index: number) {
        return (
            <ListItem className="grid grid-cols-4 mb-5 items-start w-15 gap-x-5">
                <div className="col-span-1">
                    {campaign.images && <ListItemIcon>
                        <img alt={`campaign-${campaign.images[0].id}`}
                             width={90}
                             height={90}
                             src={campaign.images[0].url}/>
                    </ListItemIcon>}
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-3">
                        <div className="col-start-1 col-span-3">
                            <ListItemText
                                primary={campaign?.name}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="col-start-1 col-span-1 font-bold">
                            Số lượng:
                        </div>
                        <div className="grid col-start-3 justify-items-end">
                            {orderInfo[index].quantity}
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="col-start-1 col-span-1 font-bold">
                            Đơn giá:
                        </div>
                        <div className="col-start-3 grid justify-items-end">
                            {getCurrentPrice(campaign).toLocaleString()} Đồng
                        </div>
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="col-start-1 col-span-1 font-bold">
                            Tổng:
                        </div>
                        <div className="col-start-3 grid justify-items-end">
                            {(getCurrentPrice(campaign) * orderInfo[index].quantity).toLocaleString()} Đồng
                        </div>
                    </div>
                </div>
            </ListItem>
        )
    }

    return (
        <div className="bg-white mt-5 rounded-lg w-5/12 max-h-full p-5">
            <div className="text-2xl mb-5">Thông tin thanh toán:</div>
            <Divider className="my-5"/>
            <List dense>
                {campaignsInfo.map(
                    (campaign, index) =>
                        getListItem(campaign, index)
                )}
                <Divider className="my-5"/>
                <ListItem className="grid grid-cols-4 mt-5">
                    <span className="font-bold text-xl">Thành tiền: </span>
                    <div className="col-start-2 col-span-3 grid justify-items-end text-xl">
                        {campaignsInfo
                            .map((campaign, index) => getCurrentPrice(campaign) * orderInfo[index].quantity)
                            .reduce(function (previousValue, currentValue) {
                                return previousValue + currentValue;
                            }).toLocaleString()
                        } Đồng
                    </div>
                </ListItem>
            </List>
            <div className="flex mt-16 justify-between">
                <Button onClick={handleClick}
                        variant="outlined"
                        type="submit"
                        style={{fontSize: '20px'}}
                        className="h-16 w-48 ml-0 bg-red-600 text-white hover:bg-red-500">
                    Tiếp Tục
                </Button>
                <Button onClick={() => router.back()}
                        variant="outlined"
                        style={{fontSize: '20px'}}
                        className="h-16 w-48 ml-5 bg-gray-600 text-white hover:bg-gray-500">
                    Quay Lại
                </Button>
            </div>
        </div>
    )
}