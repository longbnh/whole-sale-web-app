import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup
} from "@mui/material";
import {IPaymentType} from "../../../shared/models/IPaymentType";
import orderApi from "../../../api/orderApi";
import Button from "@mui/material/Button";
import {IVNPayOrder} from "../../../shared/models/IVNPayOrder";
import campaignApi from "../../../api/campaignApi";
import useSWR from "swr";
import {ICampaign} from "../../../shared/models/ICampaign";
import {getCurrentPrice} from "../../../shared/utils/CampaignUtils";
import {LOCAL_STORAGE} from "../../../shared/enum/enum";
import {IOrder, orderInfo} from "../../../shared/models/IOrder";

const Content = () => {
    const router = useRouter();
    const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([]);
    const [paymentType, setPaymentType] = useState<number>(0);
    const [orderInfo, setOrderInfo] = useState<orderInfo[]>([]);
    const [addressInfo, setAddressInfo] = useState<string>("");
    const listCampaignId = orderInfo.map(order => order.campaignId);

    const getPaymentList = async () => {
        const response = await orderApi.getPaymentType();
        setPaymentTypes(response.data);
    };
    useEffect(() => {
        setOrderInfo(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.CART_ITEM) || "[]"))
        setAddressInfo(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.ADDRESS) || ""))
        getPaymentList()
            .then(response => {
                setPaymentType(2)
            })
    }, [])
    const campaignsSWR = useSWR(listCampaignId, campaignApi.getCampaigns, {
        revalidateOnFocus: true,
        refreshInterval: 5000,
    });
    const campaignsInfo = campaignsSWR.data;

    const handlePaymentType = (paymentId: number) => {
        setPaymentType(paymentId)
    }

    const handlePayment = () => {
        const aId: number = parseInt(addressInfo);
        const order: IOrder = {
            campaigns: orderInfo,
            addressId: aId,
            returnUrl: "http://localhost:3000/",
            paymentType: paymentType,
        }

        orderApi.createOrder(order)
            .then(response => {
                router.push(response.data[0].paymentUrl)
            })
    }

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
        <div
            className="w-full relative bg-gray-100 max-h-full"
        >
            {campaignsInfo && <div className="flex w-1200 mx-auto justify-between gap-5">
                <div className="bg-white mt-5 rounded-lg grow max-h-full p-5">
                    <div className="flex flex-col">
                        <span className="text-2xl">Chọn phương thức thanh toán:</span>
                        <Divider className="my-5"/>
                        {paymentType && <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={paymentType}
                                name="radio-buttons-group"
                            >
                                <List sx={{
                                    width: '100%',
                                    padding: 0
                                }}>
                                    {paymentTypes.map((paymentType) => {
                                        return (
                                            <>
                                                <ListItem
                                                    key={paymentType.id}
                                                    disablePadding
                                                >
                                                    <ListItemButton role={undefined} dense
                                                                    className="h-24"
                                                                    disabled={paymentType.id === 1}
                                                                    onClick={() => handlePaymentType(paymentType.id)}>
                                                        <ListItemIcon>
                                                            <FormControlLabel value={paymentType.id} control={<Radio/>}
                                                                              label={
                                                                                  <img alt={`logo-${paymentType.name}`}
                                                                                       width={120}
                                                                                       height={60}
                                                                                       src={`${paymentType.name}Logo.svg`}/>
                                                                              }/>
                                                        </ListItemIcon>
                                                        <ListItemText id={paymentType.id.toString()}
                                                                      className="ml-5"
                                                                      primary={`${paymentType.name}`}/>
                                                    </ListItemButton>

                                                </ListItem>
                                                <Divider className="my-5"/>
                                            </>
                                        );
                                    })}
                                </List>
                            </RadioGroup>
                        </FormControl>}
                    </div>
                </div>
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
                        <Button onClick={handlePayment}
                                variant="outlined"
                                style={{fontSize: '20px'}}
                                className="h-16 w-48 ml-0 bg-red-600 text-white hover:bg-red-500">
                            Thanh Toán
                        </Button>
                        <Button onClick={() => router.back()}
                                variant="outlined"
                                style={{fontSize: '20px'}}
                                className="h-16 w-48 ml-5 bg-gray-600 text-white hover:bg-gray-500">
                            Quay Lại
                        </Button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Content;
