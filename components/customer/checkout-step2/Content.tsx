import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {IAddress} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {
    Divider,
    FormControl,
    FormControlLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup
} from "@mui/material";
import {APP_PATH, LOCAL_STORAGE} from "../../../shared/enum/enum";
import useSWR from "swr";
import campaignApi from "../../../api/campaignApi";
import {ICampaign} from "../../../shared/models/ICampaign";
import {getCurrentPrice} from "../../../shared/utils/CampaignUtils";
import Button from "@mui/material/Button";
import {LocationMarkerIcon} from "@heroicons/react/solid";


interface orderInfo {
    campaignId: number;
    quantity: number;
}

const Content = () => {
        const [addresses, setAddresses] = useState<IAddress[]>([])
        const [addressSet, setAddressSet] = useState<number>();
        const [orderInfo, setOrderInfo] = useState<orderInfo[]>([]);
        const listCampaignId = orderInfo.map(order => order.campaignId);
        const router = useRouter();
        const campaignsSWR = useSWR(listCampaignId, campaignApi.getCampaigns, {
            revalidateOnFocus: true,
            refreshInterval: 5000,
        });
        const campaignsInfo = campaignsSWR.data;

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

        useEffect(() => {
            setOrderInfo(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.CART_ITEM) || "[]"))
            console.log(orderInfo)
            addressApi.getAddresses()
                .then(response => {
                    setAddresses(response.data)
                    console.log(response.data)
                    console.log(response.data.filter(address => address.isPrimary)[0].id)
                    setAddressSet(response.data.filter(address => address.isPrimary)[0].id);
                })
                .catch(error => console.log(error));
        }, [])

        function getLabel(address: IAddress) {
            return (
                <div className="flex flex-col my-2">
                <span className="font-bold mr-2">
                    {address.receiverName} - {address.phoneNumber}
                </span>
                    <span className="mr-5">
                    {address.detailAddress}, {address.ward.name}, {address.district.name}, {address.city.name}
                </span>
                    {address.isPrimary && <span className="text-gray-500">
                    Mặc định
                </span>}
                </div>
            )
        }

        const handleRadioCheck = (e: any) => {
            let idCheck = e.target.value;
            console.log(idCheck)
            setAddressSet(idCheck);
        }

        const handleSubmit = (e: any) => {
            e.preventDefault();
            console.log(addressSet)
            const myStorage = window.localStorage;

            myStorage.setItem(LOCAL_STORAGE.ADDRESS, JSON.stringify(addressSet));
            router.push(APP_PATH.CUSTOMER.CHECKOUT_3)
        }

        return (
            <div
                className="w-full relative bg-gray-100 max-h-full"
            >
                {campaignsInfo && <div className="flex w-1200 mx-auto justify-between gap-5">
                    <div className="bg-white mt-5 rounded-lg grow max-h-full p-5">
                            <span className="flex text-2xl items-center">
                                <LocationMarkerIcon className="h-5 w-5 mr-3 text-red-400"/>
                                Chọn địa chỉ nhận hàng
                            </span>
                        <Divider className="my-5"/>
                        {addressSet && <FormControl className="mt-5 items-start">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={addressSet}
                                name="radio-buttons-group"
                            >
                                {addresses.map(address =>
                                    <FormControlLabel value={address.id}
                                                      key={address.id}
                                                      onChange={handleRadioCheck}
                                                      control={<Radio/>}
                                                      label={getLabel(address)}/>
                                )}
                            </RadioGroup>
                        </FormControl>}
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
                            <Button onClick={handleSubmit}
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
                </div>}

            </div>
        );
    }
;

export default Content;
