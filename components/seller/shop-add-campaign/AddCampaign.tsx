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
import RemoveIcon from '@mui/icons-material/Remove';
import {APP_PATH, POPUP_CREATE_PRODUCT} from "../../../shared/enum/enum";
import NumberFormat from "../../../utils/NumberFormat";
import {ICampaign as ICampaignRequest} from "../../../shared/models/modifyApi/ICampaign";
import campaignApi from "../../../api/campaignApi";
import {CustomAlertDialog} from "../../commons/CustomAlertDialog";
import {ICampaign} from "../../../shared/models/ICampaign";

interface InputFieldProps {
    price?: number,
    requiredSaleQuantity?: number,
}

const AddCampaign = () => {
    const router = useRouter();
    const {id} = router.query;
    const [product, setProduct] = useState<IProduct>();
    const [promotionPlans, setPromotionPlans] = useState<IPromotionPlan[]>([]);
    const [isPromoted, setIsPromoted] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [promotionPlanId, setPromotionPlanId] = useState<number | undefined>();
    const [inputList, setInputList] = useState<InputFieldProps[]>([{}, {}]);
    const [startDate, setStartDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const [endDate, setEndDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const [quantity, setQuantity] = React.useState<number>();
    const [campaign, setCampaign] = useState<ICampaign>();

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (quantity) {
                let campaignRequest: ICampaignRequest = {
                    startDate: startDate!.toLocaleDateString(),
                    endDate: endDate!.toLocaleDateString(),
                    promotionPlanId: promotionPlanId,
                    quantity: quantity,
                    milestones: inputList,
                    isPublish: true,
                }
                let response = await campaignApi.createCampaign(parseInt(id as string), campaignRequest);
                setCampaign(response.data);

            }
        } catch(error) {
            //TODO handle error
        } finally {
            setOpen(true)
            setLoading(false)
        }
    }

    const handleClose = async () => {
        let id = campaign!.id
        await router.push(`${APP_PATH.SELLER.CAMPAIGN}/${id}`)
    }

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
            <CustomAlertDialog title="Thông báo"
                               content="Cập nhật sản phẩm thành công"
                               btName={POPUP_CREATE_PRODUCT.Ok}
                               open={open}
                               handleClickClose={handleClose}/>
            {product &&
            <div>
                <div
                    className="bg-white flex mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl p-5 gap-x-56">
                    <img src={product.productImages[0].url} className="w-56 h-56"/>
                    <div className="flex flex-col gap-y-3">
                        <div className="flex flex-row text-2xl font-bold">
                            {product.name}
                        </div>
                        <div className="flex flex-row text-xl justify-between gap-x-20">
                            <div>
                                Danh mục:
                            </div>
                            <div>
                                {product.category.name}
                            </div>
                        </div>
                        <div className="flex flex-row text-xl justify-between">
                            <div>
                                Giá gốc:
                            </div>
                            <div>
                                {product.originalPrice}
                            </div>
                        </div>
                        <div className="flex flex-row text-xl justify-between">
                            <div>
                                Xuất xứ:
                            </div>
                            <div>
                                {product.origin.countryName}
                            </div>
                        </div>
                        <div className="flex flex-row text-xl justify-between">
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
                    className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden flex flex-col rounded-xl p-5 gap-y-5">
                    <div className="grid grid-cols-12 gap-y-5">
                        <div className="col-span-12 text-2xl font-bold">Cài đặt số lượng bán</div>
                        <TextField label="Số lượng bán ra"
                                   onChange={(e) => setQuantity(parseInt(e.target.value))}
                                   className="w-2/5 col-span-12"
                        />
                    </div>

                    <div className="grid grid-cols-12 gap-y-5 mt-10">
                        <div className="col-span-12 text-2xl font-bold">Cài đặt khuyến mãi</div>
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
                    </div>

                    <div className="flex flex-col gap-y-10 mt-10">
                        <div className="col-span-12 text-2xl font-bold">Cài đặt số lượng bán</div>
                        <div className="grid grid-cols-12">
                            <TextField label="Mốc giá"
                                       className="col-span-3"
                                       value={NumberFormat(product.originalPrice)}
                                       disabled/>
                            <TextField label="Số lượng cần đạt"
                                       className="col-start-6 col-span-3"
                                       value={0}
                                       disabled/>
                        </div>
                        {inputList.map((input, index) => {
                            return (
                                <div key={index} className="grid grid-cols-12">
                                    <TextField label="Mốc giá"
                                               className="col-span-3"
                                               value={input.price}
                                               onChange={(e) => {
                                                   let newValue = e.target.value;
                                                   if (newValue === "") {
                                                       newValue = "0"
                                                   }
                                                   input.price = parseInt(newValue as string);
                                                   setInputList([...inputList])
                                               }}/>
                                    <TextField label="Số lượng cần đạt"
                                               className="col-start-6 col-span-3"
                                               value={input.requiredSaleQuantity}
                                               onChange={(e) => {
                                                   let newValue = e.target.value;
                                                   if (newValue === "") {
                                                       newValue = "0"
                                                   }
                                                   input.requiredSaleQuantity = parseInt(newValue as string);
                                                   setInputList([...inputList])
                                               }}/>
                                    {(index + 1 === inputList.length)
                                    && (index + 1 >= parseInt(process.env.MIN_MILESTONE as string))
                                    &&
                                    <Button
                                        size="small"
                                        sx={{
                                            ml: 1,
                                            "&.MuiButtonBase-root:hover": {
                                                bgcolor: "transparent"
                                            }
                                        }}
                                        onClick={() => {
                                            setInputList(inputList
                                                .filter((_, i) => i + 1 !== inputList.length))
                                        }
                                        }>
                                        <RemoveIcon fontSize="large"
                                                    className="text-red-600"/>
                                    </Button>}
                                </div>
                            )
                        })}
                        <div className="grid grid-cols-12">
                            {(inputList.length + 1 < parseInt(process.env.MAX_MILESTONE as string)) &&
                            <Button className="bg-red-600 hover:bg-red-500 col-start-7 col-span-2"
                                    variant="contained"
                                    onClick={() => {
                                        let arrLth = inputList.length;
                                        let newInput = {}
                                        setInputList(inputList => [...inputList, newInput])
                                    }}>Thêm mốc</Button>
                            }
                        </div>
                    </div>

                    <div>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <div className="grid grid-cols-12 gap-y-10 mt-10">
                                <div className="col-span-12 text-2xl font-bold">Cài đặt thời gian bán</div>
                                <DateTimePicker
                                    label="Ngày bắt đầu"
                                    value={startDate}
                                    inputFormat="MM/dd/yyyy HH:mm"
                                    onChange={handleStartDate}
                                    renderInput={(params) => <TextField className="col-span-3" {...params} />}
                                />
                                <DateTimePicker
                                    label="Ngày kết thúc"
                                    value={endDate}
                                    inputFormat="MM/dd/yyyy HH:mm"
                                    onChange={handleEndDate}
                                    renderInput={(params) => <TextField
                                        className="col-span-3 col-start-6" {...params} />}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                    <div className="flex justify-end gap-x-5 mt-10">
                        <Button className="w-1/6 bg-red-600 hover:bg-red-500 text-white"
                                onClick={handleSubmit}>
                            Đăng bán
                        </Button>
                        <Button className="w-1/6 bg-gray-500 hover:bg-gray-400 text-white"
                                onClick={() => router.push(`${APP_PATH.SELLER.PRODUCT}/${id}`)}>
                            Hủy
                        </Button>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default AddCampaign;