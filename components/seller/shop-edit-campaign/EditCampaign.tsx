import {
    Backdrop,
    Button,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    Switch,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {IPromotionPlan} from "../../../shared/models/IPromotionPlan";
import promotionPlanApi from "../../../api/promotionPlanApi";
import DateAdapter from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {APP_PATH, PAGE_REQUEST, POPUP_PRODUCT} from "../../../shared/enum/enum";
import NumberFormat from "../../../utils/NumberFormat";
import {ICampaign as ICampaignRequest} from "../../../shared/models/modifyApi/ICampaign";
import campaignApi from "../../../api/campaignApi";
import {CustomAlertDialog} from "../../commons/CustomAlertDialog";
import {ICampaign} from "../../../shared/models/ICampaign";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import {toISOLocal} from "../../../utils/LocalDateTimeUtil";
import {IErrorResponse} from "../../../shared/models/IErrorResponse";
import Image from 'next/image'
import {matchCampaignStatusDisplayType} from "../../../utils/PageRequestUtils";
import CAMPAIGN_DISPLAY = PAGE_REQUEST.STATUS.CAMPAIGN.CAMPAIGN_DISPLAY;
import Typography from "@mui/material/Typography";

interface InputFieldProps {
    price?: number,
    requiredSaleQuantity?: number,
    milestoneNumber?: number;
}

const EditCampaign = () => {
    const router = useRouter();
    const {id} = router.query;
    const [promotionPlans, setPromotionPlans] = useState<IPromotionPlan[]>([]);
    const [isPromoted, setIsPromoted] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [promotionPlanId, setPromotionPlanId] = useState<number | undefined>();
    const [inputList, setInputList] = useState<InputFieldProps[]>([]);
    const [notiContent, setNotiContent] = useState<string>("");
    const [startDate, setStartDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const [endDate, setEndDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );
    const [quantity, setQuantity] = React.useState<number>();
    const [campaign, setCampaign] = useState<ICampaign>();
    const [error, setError] = useState<IErrorResponse>({status: false});

    useEffect(() => {
        if (id) {
            campaignApi.getCampaignForSeller(parseInt(id as string))
                .then(response => {
                    let data = response.data;
                    if (matchCampaignStatusDisplayType(data.status, CAMPAIGN_DISPLAY.ACTIVE)) {
                        router.push(`${APP_PATH.SELLER.SHOP_CAMPAIGN}`)
                    } else {
                        setCampaign(data);
                        setQuantity(data.currentSaleQuantity);
                        setInputList(data.mileStones.filter(milestone => milestone.requiredSaleQuantity !== 0));
                        setStartDate(new Date(data.startDate));
                        setEndDate(new Date(data.endDate));
                    }
                })
                .catch(error => {
                    if (error.status === 404) {
                        setError({
                            errorLabel: "campaign",
                            errorContent: "Không tìm thấy sản phẩm bạn mong muốn",
                            status: true,
                        })
                    } else {
                        setError({
                            errorLabel: "campaign",
                            errorContent: "Đã có lỗi xảy ra",
                            status: true,
                        })
                    }
                })
        }
        promotionPlanApi.getPromotionPlans()
            .then(response => {
                setPromotionPlans(response.data)
            })
            .catch(error => {
                //TODO handle error
            })

    }, [id])

    const handleStartDate = (newValue: Date | null) => {
        setStartDate(newValue);
    };
    const handleEndDate = (newValue: Date | null) => {
        setEndDate(newValue);
    };

    function handleError(): boolean {
        //Quantity error
        if (quantity === undefined) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "quantity",
                errorContent: "Trường này bị trống"
            }))
            return false;
        } else {
            if (quantity === 0) {
                setError(prevState => ({
                    ...prevState,
                    status: true,
                    errorLabel: "quantity",
                    errorContent: "Số lượng bán ra phải lớn hơn 0"
                }))
                return false;
            }
        }

        //Input list error
        for (let i = 0; i < inputList.length; i++) {
            let price = inputList[i].price;
            let requiredSaleQuantity = inputList[i].requiredSaleQuantity;

            //quantity error
            if (requiredSaleQuantity === undefined) {
                setError(prevState => ({
                    ...prevState,
                    status: true,
                    errorLabel: "requiredSaleQuantity",
                    optionalId: i,
                    errorContent: "Trường này bị trống"
                }))
                return false;
            } else {
                if (requiredSaleQuantity > quantity) {
                    setError(prevState => ({
                        ...prevState,
                        status: true,
                        errorLabel: "requiredSaleQuantity",
                        optionalId: i,
                        errorContent: "Mốc mua phải nhỏ hơn số lượng bán"
                    }))
                    return false;
                }
                if (i === 0) {
                    if (requiredSaleQuantity <= 0) {
                        setError(prevState => ({
                            ...prevState,
                            status: true,
                            errorLabel: "requiredSaleQuantity",
                            optionalId: i,
                            errorContent: "Mốc mua phải lớn hơn 0"
                        }))
                        return false;
                    }
                } else {
                    let prevRequiredSaleQuantity = inputList[i - 1].requiredSaleQuantity;
                    if (prevRequiredSaleQuantity !== undefined && (requiredSaleQuantity <= prevRequiredSaleQuantity)) {
                        setError(prevState => ({
                            ...prevState,
                            status: true,
                            errorLabel: "requiredSaleQuantity",
                            optionalId: i,
                            errorContent: "Mốc mua phải lớn hơn mốc trước"
                        }))
                        return false;
                    }
                }
            }

            //price error
            if (price === undefined) {
                setError(prevState => ({
                    ...prevState,
                    status: true,
                    errorLabel: "price",
                    optionalId: i,
                    errorContent: "Trường này bị trống"
                }))
                return false;
            } else {
                if (i === 0) {
                    if (price >= campaign!.mileStones[0].price) {
                        setError(prevState => ({
                            ...prevState,
                            status: true,
                            errorLabel: "price",
                            optionalId: i,
                            errorContent: "Giá phải bé hơn giá gốc"
                        }))
                        return false;
                    }
                } else {
                    let prevPrice = inputList[i - 1].price;
                    if (prevPrice !== undefined && (price >= prevPrice)) {
                        setError(prevState => ({
                            ...prevState,
                            status: true,
                            errorLabel: "price",
                            optionalId: i,
                            errorContent: "Giá phải bé hơn giá trước"
                        }))
                        return false;
                    }
                }
            }
        }

        //Date error
        if (startDate === null) {
            setError(prevState => ({
                ...prevState,
                status: true,
                errorLabel: "startDate",
                errorContent: "Trường này bị trống"
            }))
            return false;
        } else {
            if (startDate < new Date()) {
                setError(prevState => ({
                    ...prevState,
                    status: true,
                    errorLabel: "startDate",
                    errorContent: "T/g phải lớn hơn hiện tại"
                }))
                return false;
            }
            if (endDate === null) {
                setError(prevState => ({
                    ...prevState,
                    status: true,
                    errorLabel: "endDate",
                    errorContent: "Trường này bị trống"
                }))
                return false;
            } else {
                if (endDate <= startDate) {
                    setError(prevState => ({
                        ...prevState,
                        status: true,
                        errorLabel: "endDate",
                        errorContent: "T/g kết thúc nhỏ hơn t/g bắt đầu"
                    }))
                    return false;
                }
            }
        }
        setError({status: false})
        return true;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (loading) {
            return;
        }
        if (!handleError()) {
            return;
        }
        try {
            setLoading(true)
            if (quantity) {
                let campaignRequest: ICampaignRequest = {
                    startDate: toISOLocal(startDate),
                    endDate: toISOLocal(endDate),
                    promotionPlanId: promotionPlanId,
                    quantity: quantity,
                    milestones: inputList,
                    isPublish: true,
                }
                await campaignApi.updateCampaign(parseInt(id as string), campaignRequest);
                setNotiContent("Cập nhật sản phẩm thành công")
            }
        } catch (error) {
            setNotiContent("Đã có lỗi xảy ra")
        } finally {
            setLoading(false)
            setOpen(true)
        }
    }

    const handleClose = async () => {
        let id = campaign!.id
        await router.push(`${APP_PATH.SELLER.CAMPAIGN}/${id}`)
    }

    if (!campaign) {
        return (
            <>
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={!campaign}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {error && error.errorLabel === "campaign" && <CustomAlertDialog title="Thông báo"
                                                                                content={error.errorContent as string}
                                                                                btName={POPUP_PRODUCT.Ok}
                                                                                open={true}
                                                                                handleClickClose={() => router.push("/seller")}/>}
            </>
        )
    }

    return (
        <div
            className="w-full relative flex flex-col bg-gray-100 ml-56 min-h-screen py-5"
        >
            <div className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl h-auto">
                <div className="text-2xl font-semibold p-4 ml-5">Đăng bán</div>
            </div>
            <CustomAlertDialog title="Thông báo"
                               content={notiContent}
                               btName={POPUP_PRODUCT.Ok}
                               open={open}
                               handleClickClose={handleClose}/>
            {campaign &&
                <div>
                    <div
                        className="bg-white flex mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden rounded-xl p-5 gap-x-56">
                        <Image src={campaign.images[0].url} alt={"campaignImage"} width={200} height={200}/>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex flex-row text-2xl font-bold">
                                {campaign.name}
                            </div>
                            <div className="flex flex-row text-xl justify-between gap-x-20">
                                <div>
                                    Danh mục:
                                </div>
                                <div>
                                    {campaign.category.name}
                                </div>
                            </div>
                            <div className="flex flex-row text-xl justify-between">
                                <div>
                                    Giá gốc:
                                </div>
                                <div>
                                    {NumberFormat(campaign.mileStones[0].price)}đ
                                </div>
                            </div>
                            <div className="flex flex-row text-xl justify-between">
                                <div>
                                    Xuất xứ:
                                </div>
                                <div>
                                    {campaign.origin}
                                </div>
                            </div>
                            <div className="flex flex-row text-xl justify-between">
                                <div>
                                    Thương hiệu:
                                </div>
                                <div>
                                    {campaign.brand?.name}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-white mt-5 mx-auto w-1200 overflow-y-auto overflow-x-hidden flex flex-col rounded-xl p-5 gap-y-5">
                        <div className="grid grid-cols-12 gap-y-5">
                            <div className="col-span-12 text-2xl font-bold">Cài đặt số lượng bán</div>
                            <TextField label="Số lượng bán ra"
                                       value={(quantity !== undefined && NumberFormat(quantity)) || ''}
                                       error={error.errorLabel === "quantity"}
                                       onKeyPress={event => {
                                           const regex = /\d/
                                           if (!regex.test(event.key)) {
                                               event.preventDefault();
                                           }
                                       }}
                                       helperText={error.errorLabel === "quantity" ? error.errorContent : ""}
                                       onChange={(e) => {
                                           let newValue = e.target.value;
                                           if (newValue !== "") {
                                               setQuantity(parseInt(newValue.replace(/,/g, '')))
                                           } else {
                                               setQuantity(undefined)
                                           }
                                       }}
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
                            <div className="grid grid-cols-12 gap-y-5">
                                <Typography className="col-span-3 justify-self-center" component={'span'}>
                                    Mốc bán
                                </Typography>
                                <Typography className="col-start-6 col-span-3 justify-self-center" component={'span'}>
                                    Giá bán
                                </Typography>
                                <div className="col-span-4"/>
                                <TextField className="col-span-3"
                                           value={0}
                                           disabled/>
                                <TextField className="col-start-6 col-span-3"
                                           value={NumberFormat(campaign.mileStones[0].price)}
                                           disabled/>

                            </div>
                            {inputList.map((input, index) => {
                                return (
                                    <div key={index} className="grid grid-cols-12">
                                        <TextField className="col-span-3"
                                                   value={(input.requiredSaleQuantity !== undefined
                                                       && NumberFormat(input.requiredSaleQuantity)) || ""}
                                                   onKeyPress={event => {
                                                       const regex = /\d/
                                                       if (!regex.test(event.key)) {
                                                           event.preventDefault();
                                                       }
                                                   }}
                                                   error={error.errorLabel === "requiredSaleQuantity"
                                                       && index === error.optionalId}
                                                   helperText={error.errorLabel === "requiredSaleQuantity"
                                                   && index === error.optionalId ? error.errorContent : ""}
                                                   onChange={(e) => {
                                                       let newValue = e.target.value;
                                                       if (newValue !== "") {
                                                           input.requiredSaleQuantity = parseInt((newValue as string).replace(/,/g, ''));
                                                       } else {
                                                           input.requiredSaleQuantity = undefined;
                                                       }
                                                       setInputList([...inputList])
                                                   }}/>
                                        <TextField className="col-start-6 col-span-3"
                                                   onKeyPress={event => {
                                                       const regex = /\d/
                                                       if (!regex.test(event.key)) {
                                                           event.preventDefault();
                                                       }
                                                   }}
                                                   error={error.errorLabel === "price" && index === error.optionalId}
                                                   helperText={error.errorLabel === "price"
                                                   && index === error.optionalId ? error.errorContent : ""}
                                                   value={(input.price !== undefined && NumberFormat(input.price)) || ''}
                                                   InputProps={{
                                                       endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                                                   }}
                                                   onChange={(e) => {
                                                       let newValue = e.target.value;
                                                       if (newValue !== "") {
                                                           input.price = parseInt((newValue as string).replace(/,/g, ''));
                                                       } else {
                                                           input.price = undefined;
                                                       }
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

                                                <DeleteForeverIcon fontSize="large"
                                                                   className="text-red-600"/>

                                            </Button>}
                                    </div>
                                )
                            })}
                            <div className="grid grid-cols-12">
                                {(inputList.length + 1 < parseInt(process.env.MAX_MILESTONE as string)) &&
                                    <Button className="text-red-500 text-xl col-span-8"
                                            variant="text"
                                            startIcon={<AddIcon/>}
                                            onClick={() => {
                                                let newInput = {}
                                                setInputList(inputList => [...inputList, newInput])
                                            }}>
                                        Thêm mốc
                                    </Button>
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
                                        inputFormat="dd/MM/yyyy HH:mm"
                                        onChange={handleStartDate}
                                        renderInput={(params) =>
                                            <TextField className="col-span-3" {...params}
                                                       error={error.errorLabel === "startDate"}
                                                       helperText={error.errorLabel === "startDate"
                                                           && error.errorContent}
                                                       onCut={(e) => e.preventDefault()}
                                                       onPaste={(e) => e.preventDefault()}
                                                       onKeyDown={(e) => e.preventDefault()}
                                                       onDrop={(e) => e.preventDefault()}
                                            />}
                                    />
                                    <DateTimePicker
                                        label="Ngày kết thúc"
                                        value={endDate}
                                        inputFormat="dd/MM/yyyy HH:mm"
                                        onChange={handleEndDate}
                                        renderInput={(params) =>
                                            <TextField className="col-span-3 col-start-6" {...params}
                                                       error={error.errorLabel === "endDate"}
                                                       helperText={error.errorLabel === "endDate"
                                                           && error.errorContent}
                                                       onKeyDown={(e) => e.preventDefault()}
                                                       onPaste={(e) => e.preventDefault()}
                                                       onCut={(e) => e.preventDefault()}
                                                       onDrop={(e) => e.preventDefault()}
                                            />}
                                    />
                                </div>
                            </LocalizationProvider>
                        </div>
                        <div className="flex justify-end gap-x-5 mt-10">
                            <Button className="w-1/6 bg-red-600 hover:bg-red-500 text-white"
                                    disabled={loading}
                                    onClick={handleSubmit}>
                                {
                                    loading
                                        ? <CircularProgress size={30} className="text-white"/>
                                        : <span className="text-xl">Thay đổi</span>
                                }
                            </Button>
                            <Button className="w-1/6 bg-gray-500 hover:bg-gray-400 text-white text-xl"
                                    disabled={loading}
                                    onClick={() => {
                                        if (!loading) {
                                            router.push(`${APP_PATH.SELLER.CAMPAIGN}/${id}`)
                                        }
                                    }}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default EditCampaign;