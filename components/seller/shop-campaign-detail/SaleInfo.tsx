import React from "react";
import {ICampaign} from "../../../shared/models/ICampaign";
import {Button, IconButton, TextField, tooltipClasses, TooltipProps} from "@mui/material";
import {styled} from "@mui/material/styles";
import {getLastActiveMilestone, getPercentageSaleOff} from "../../../utils/CampaignUtils";
import {IMilestone} from "../../../shared/models/IMilestone";
import {QuestionMarkCircleIcon} from "@heroicons/react/solid";
import Tooltip from '@mui/material/Tooltip';
import {DateFormat} from "../../../utils/DateFormat";

interface CampaignProps {
    data: ICampaign;
}

const CustomDisableInput = styled(TextField)(() => ({
    ".MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
        color: "#000000",
    }
}));

const myTooltip = {
    sale: "Số lượng bán ra là số sản phẩm đã được mua. Số lượng tối đa là số lượng sản phẩm tối đa mà bạn muốn bán.",
    promotion: "Chương trình khuyến mãi sẽ ảnh hưởng tới độ phủ của sản phẩm và các thiết lập mốc giá của bạn.",
    milestone: "Mốc giá màu xanh là giá hiện tại của sản phẩm. Các mốc giá màu xám là những mốc giá đã vượt qua.Còn các mốc trắng là các mốc chưa đạt được.",
    date: "Sản phẩm sẽ kết thúc bán khi đạt tới ngày kết thúc.",

}

const SaleInfo: React.FC<CampaignProps> = (props) => {
    const {data} = props;
    return (
        <div className="mx-4 overflow-y-auto overflow-x-hidden min-h-screen">
            <div
                className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
                <div className="grid grid-cols-4 mb-16 grid-rows-2 items-center gap-y-5">
                    <div className="col-span-1 text-2xl font-bold">
                        Số lượng bán ra:
                    </div>
                    <div className="col-span-3">
                        <Tooltip title={myTooltip.sale}>
                            <IconButton
                                disableRipple
                                color="primary"
                                sx={{
                                    ml: 1,
                                    "&.MuiButtonBase-root:hover": {
                                        bgcolor: "transparent"
                                    }
                                }}>
                                <QuestionMarkCircleIcon className="h-5 w-5"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div>
                        <span className="text-xl">Số lượng đã bán:</span>
                    </div>
                    <CustomDisableInput
                        disabled
                        className="w-1/2"
                        inputProps={{min: 0, style: {textAlign: 'right'}}}
                        value={data.currentSaleQuantity}/>
                    <div>
                        <span className="text-xl">Số lượng tối đa:</span>
                    </div>
                    <CustomDisableInput
                        disabled
                        className="w-1/2"
                        inputProps={{min: 0, style: {textAlign: 'right'}}}
                        value={data.inStockQuantity}/>
                </div>

                <div className="grid grid-cols-8 my-16 grid-rows-2 items-center gap-y-5">
                    <div className="col-span-2 text-2xl font-bold">
                        Chương trình khuyến mãi:
                    </div>
                    <div className="col-span-6">
                        <Tooltip title={myTooltip.promotion}>
                            <IconButton
                                disableRipple
                                color="primary"
                                sx={{
                                    ml: 1,
                                    "&.MuiButtonBase-root:hover": {
                                        bgcolor: "transparent"
                                    }
                                }}>
                                <QuestionMarkCircleIcon className="h-5 w-5"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="col-span-2">
                        <span className="text-xl">Chương trình:</span>
                    </div>
                    <CustomDisableInput disabled
                                        className="col-span-6 w-1/4"
                                        value={data.promotionPlan ? data.promotionPlan.name : "Không"}/>

                    {data.promotionPlan && <>
                        <div className="col-span-2">
                            <span className="text-xl">Lượt giảm:</span>
                        </div>
                        <CustomDisableInput disabled
                                            className="col-span-6 w-1/4"
                                            value={data.promotionPlan.percentSale}/>
                        <div className="col-span-5">
                            <span className="text-xl">Thời gian chương trình:</span>
                        </div>
                        <div className="col-start-2 text-xl">Từ</div>
                        <CustomDisableInput disabled
                                            className="col-span-6 w-1/4"
                                            value={DateFormat(data.promotionPlan.startDate)}/>
                        <div className="col-start-2 text-xl">Đến</div>
                        <CustomDisableInput disabled
                                            className="col-span-6 w-1/4"
                                            value={DateFormat(data.promotionPlan.endDate)}/>
                    </>}
                </div>

                <div className="grid grid-cols-8 my-16 justify-items-center gap-y-5">
                    <div className="col-start-1 col-span-2 justify-self-start text-2xl font-bold">
                        Các mốc giá:
                    </div>
                    <div className="col-span-6 justify-self-start">
                        <Tooltip title={myTooltip.milestone}>
                            <IconButton
                                disableRipple
                                color="primary"
                                sx={{
                                    ml: 1,
                                    "&.MuiButtonBase-root:hover": {
                                        bgcolor: "transparent"
                                    }
                                }}>
                                <QuestionMarkCircleIcon className="h-5 w-5"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="col-start-2 col-span-2 text-xl">Cột mốc (số lượng bán)</div>
                    <div className="col-start-5 col-span-2 text-xl">Mốc giá (đồng)</div>
                    <div className="col-span-2"/>
                    {data.mileStones.map((mileStone: IMilestone, index: number) => {
                        return (
                            <>
                                <div className="col-start-2 col-span-2 w-1/2">
                                    <CustomDisableInput disabled
                                                        className={index === getLastActiveMilestone(data)
                                                            ? "bg-green-400"
                                                            : (index > getLastActiveMilestone(data) ? "bg-white" : "bg-gray-400")}
                                                        inputProps={{min: 0, style: {textAlign: 'right'}}}
                                                        value={mileStone.requiredSaleQuantity}/>
                                </div>
                                <div className="col-start-5 col-span-2 w-1/2">
                                    <CustomDisableInput disabled
                                                        className={index === getLastActiveMilestone(data)
                                                            ? "bg-green-400"
                                                            : (index > getLastActiveMilestone(data) ? "bg-white" : "bg-gray-400")}
                                                        inputProps={{min: 0, style: {textAlign: 'right'}}}
                                                        value={mileStone.price.toLocaleString()}/>
                                    {index !== 0 && <div className="text-red-500 font-bold text-right text-xl">
                                        Giảm {getPercentageSaleOff(data, mileStone.price)} %
                                    </div>}
                                </div>
                                <div className="col-span-2"/>
                            </>
                        )
                    })}
                </div>

                <div className="grid grid-cols-4 my-16 grid-rows-2 items-center gap-y-5">
                    <div className="col-span-1 text-2xl font-bold">
                        Thời gian bán:
                    </div>
                    <div className="col-span-3">
                        <Tooltip title={myTooltip.date}>
                            <IconButton
                                disableRipple
                                color="primary"
                                sx={{
                                    ml: 1,
                                    "&.MuiButtonBase-root:hover": {
                                        bgcolor: "transparent"
                                    }
                                }}>
                                <QuestionMarkCircleIcon className="h-5 w-5"/>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div>
                        <span className="text-xl">Ngày bắt đầu:</span>
                    </div>
                    <CustomDisableInput disabled
                                        className="w-4/5"
                                        value={DateFormat(data.startDate)}/>
                    <div>
                        <span className="text-xl">Ngày kết thúc:</span>
                    </div>
                    <CustomDisableInput disabled
                                        className="w-4/5"
                                        value={DateFormat(data.endDate)}/>
                </div>
            </div>
        </div>
    )
}

export default SaleInfo;