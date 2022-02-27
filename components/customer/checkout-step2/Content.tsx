import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {IAddress, IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {APP_PATH, LOCAL_STORAGE} from "../../../shared/enum/enum";
import useSWR from "swr";
import campaignApi from "../../../api/campaignApi";
import {LocationMarkerIcon} from "@heroicons/react/solid";
import {OrderInfo} from "../orderInfo/OrderInfo";
import CreateAddress from "./CreateAddress";


interface orderInfo {
    campaignId: number;
    quantity: number;
}

const Content = () => {
        const [addresses, setAddresses] = useState<IAddress[]>([])
        const [addressSet, setAddressSet] = useState<number>();
        const [orderInfo, setOrderInfo] = useState<orderInfo[]>([]);
        const [open, setOpen] = useState<boolean>(false);
        const listCampaignId = orderInfo.map(order => order.campaignId);
        const router = useRouter();
        const campaignsSWR = useSWR(listCampaignId, campaignApi.getCampaigns, {
            revalidateOnFocus: true,
            refreshInterval: 5000,
        });
        const campaignsInfo = campaignsSWR.data;

        useEffect(() => {
            setOrderInfo(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.CART_ITEM) || "[]"))
            addressApi.getAddresses()
                .then(response => {
                    setAddresses(response.data)
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
                    {address.detailAddress}, {(address.ward as IAddressUnit).name}, {(address.district as IAddressUnit).name}, {(address.city as IAddressUnit).name}
                </span>
                    {address.isPrimary && <span className="text-gray-500">
                    Mặc định
                </span>}
                </div>
            )
        }

        const handleRadioCheck = (e: any) => {
            let idCheck = e.target.value;
            setAddressSet(idCheck);
        }

        const handleSubmit = async (e: any) => {
            e.preventDefault();
            const myStorage = window.localStorage;

            myStorage.setItem(LOCAL_STORAGE.ADDRESS, JSON.stringify(addressSet));
            await router.push(APP_PATH.CUSTOMER.CHECKOUT_3)
        }

        const handleCreateAddress = () => {
            setOpen(true);
        }

        return (
            <div
                className="w-full relative bg-gray-100 max-h-full"
            >
                {campaignsInfo && <div className="flex w-1200 mx-auto justify-between gap-5">
                    <div className="bg-white mt-5 rounded-lg grow h-fit p-5">
                            <span className="flex text-2xl items-center">
                                <LocationMarkerIcon className="h-5 w-5 mr-3 text-red-400"/>
                                Chọn địa chỉ nhận hàng
                            </span>
                        <Divider className="my-5"/>
                        {addressSet && <FormControl className="mt-5">
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
                            <Button onClick={handleCreateAddress}>TẠO ĐỊA CHỈ MỚI</Button>
                        </FormControl>}
                    </div>
                    {orderInfo && campaignsInfo &&
                    <OrderInfo handleClick={handleSubmit}
                               campaignsInfo={campaignsInfo}
                               orderInfo={orderInfo}/>}
                    <CreateAddress open={open} handleClose={() => setOpen(false)}/>
                </div>}
            </div>
        );
    }
;

export default Content;
