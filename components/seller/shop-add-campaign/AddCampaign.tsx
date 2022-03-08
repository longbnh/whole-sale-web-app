import {Backdrop, Button, CircularProgress, FormControlLabel, FormGroup, Switch, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {IProduct} from "../../../shared/models/IProduct";
import productApi from "../../../api/productApi";
import {IPromotionPlan} from "../../../shared/models/IPromotionPlan";
import promotionPlanApi from "../../../api/promotionPlanApi";
import DateAdapter from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface InputFieldProps {
    id: number,
    price?: number,
    requiredSaleQuantity?: number,
}

const AddCampaign = () => {
    const router = useRouter();
    const {id} = router.query;
    const [product, setProduct] = useState<IProduct>();
    const [promotionPlans, setPromotionPlans] = useState<IPromotionPlan[]>([]);
    const [isPromoted, setIsPromoted] = useState<boolean>(false);
    const [inputList, setInputList] = useState<InputFieldProps[]>([{id: 1}, {id: 2}, {id: 3}]);
    const [startDate, setStartDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const [endDate, setEndDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    useEffect(() => {
        try {
            if (id) {
                productApi.getProduct(parseInt(id as string))
                    .then(response => {
                        setProduct(response.data);
                    })
                    .catch(error => {
                        //TODO handle error
                    })
            }
            promotionPlanApi.getPromotionPlans()
                .then(response => {
                    setPromotionPlans(response.data)
                })
                .catch(error => {
                    //TODO handle error
                })
        } catch (error) {
            //TODO handle error
        }

    }, [id])

    const handleStartDate = (newValue: Date | null) => {
        setStartDate(newValue);
    };
    const handleEndDate = (newValue: Date | null) => {
        setEndDate(newValue);
    };

    return (
        <div
            className="w-full relative flex flex-col bg-gray-100 ml-56 min-h-screen py-5"
        >
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={!product}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <div className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl h-auto">
                <div className="text-xl font-semibold p-4 ml-5">Đăng bán</div>
            </div>
            {product &&
            <div>
                <div
                    className="bg-white flex mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl p-5">
                    <img src={product.productImages[0].url} className="w-56 h-56"/>
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            {product.name}
                        </div>
                        <div className="flex flex-row">
                            <div>
                                Danh mục:
                            </div>
                            <div>
                                {product.category.name}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                Giá gốc:
                            </div>
                            <div>
                                {product.originalPrice}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                Xuất xứ:
                            </div>
                            <div>
                                {product.origin.countryName}
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div>
                                Thương hiệu:
                            </div>
                            <div>
                                {product.brand.name}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl flex flex-col p-5 gap-y-5">
                    <TextField label="Số lượng bán ra"/>
                    <FormGroup>
                        <FormControlLabel control={<Switch onChange={() => setIsPromoted(!isPromoted)}/>}
                                          label="Khuyến mãi"/>
                    </FormGroup>
                    {isPromoted && <div>
                        {promotionPlans.map(plan => {
                            return (
                                <div key={plan.id}>
                                    {plan.name}
                                </div>
                            )
                        })}
                    </div>}
                    <div>
                        {inputList.map((input) => {
                            return (
                                <div key={input.id}>
                                    <TextField label="Mốc giá"
                                               value={input.price}
                                               onChange={(e) => {
                                                   input.price = parseInt(e.target.value as string);
                                                   setInputList([...inputList])
                                               }}/>
                                    <TextField label="Số lượng cần đạt"
                                               value={input.requiredSaleQuantity}
                                               onChange={(e) => {
                                                   input.requiredSaleQuantity = parseInt(e.target.value as string);
                                                   setInputList([...inputList])
                                               }}/>
                                    {(input.id === inputList.length) &&
                                    <Button onClick={() => {
                                        setInputList(inputList.filter(input => input.id !== inputList.length))
                                    }
                                    }>
                                        Delete
                                    </Button>}
                                </div>
                            )
                        })}
                        <Button onClick={() => {
                            let arrLth = inputList.length;
                            let newInput = {
                                id: arrLth + 1,
                            }
                            setInputList(inputList => [...inputList, newInput])
                        }}>Add</Button>
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                label="Ngày bắt đầu"
                                value={startDate}
                                onChange={handleStartDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DateTimePicker
                                label="Ngày kết thúc"
                                value={endDate}
                                onChange={handleEndDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default AddCampaign;