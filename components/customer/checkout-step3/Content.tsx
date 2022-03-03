import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
    Divider,
    FormControl,
    FormControlLabel,
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
import campaignApi from "../../../api/campaignApi";
import useSWR from "swr";
import {LOCAL_STORAGE} from "../../../shared/enum/enum";
import {IOrder, orderInfo} from "../../../shared/models/IOrder";
import {OrderInfo} from "../orderInfo/OrderInfo";

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

    const handlePayment = async() => {
        const aId: number = parseInt(addressInfo);
        const order: IOrder = {
            campaigns: orderInfo,
            addressId: aId,
            returnUrl: "http://localhost:3000/cart",
            paymentType: paymentType,
        }

        try {
            const response = await orderApi.createOrder(order)
            const paymentData = response.data;
            await router.push(paymentData[0].paymentUrl)
        }
        catch (error) {
            //TODO handle error here
        }
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
                {orderInfo && campaignsInfo &&
                <OrderInfo handleClick={handlePayment}
                           campaignsInfo={campaignsInfo}
                           orderInfo={orderInfo}/>}
            </div>
            }
        </div>
    );
};

export default Content;
