import React, {useState} from "react";
import {ICampaign} from "../../../shared/models/ICampaign";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PencilAltIcon} from "@heroicons/react/solid";
import DeleteIcon from '@mui/icons-material/Delete';
import {APP_PATH, PAGE_REQUEST, POPUP_PRODUCT} from "../../../shared/enum/enum";
import {useRouter} from "next/router";
import {matchCampaignStatusDisplayType} from "../../../utils/PageRequestUtils";
import CAMPAIGN_DISPLAY = PAGE_REQUEST.STATUS.CAMPAIGN.CAMPAIGN_DISPLAY;
import {StopCircle} from "@mui/icons-material";
import {getCurrentMilestoneNumber, getMaxMilestone, getMaxMilestoneNumber} from "../../../utils/CampaignUtils";
import campaignApi from "../../../api/campaignApi";
import {CustomAlertDialog} from "../../commons/CustomAlertDialog";

interface CampaignProps {
    data: ICampaign;
}

function isAvailableToCancel(campaign: ICampaign): boolean {
    const first_cond = campaign.currentSaleQuantity / getMaxMilestone(campaign) < 0.5;
    const second_cond = Math.ceil(2 / 3 * getMaxMilestoneNumber(campaign)) > getCurrentMilestoneNumber(campaign);
    return first_cond && second_cond;
}

const Setting: React.FC<CampaignProps> = (props) => {
    const {data} = props;
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const handleForcedCancel = async () => {
        try {
            await campaignApi.updateCampaignStatus(data.id, data.status);
        }
        catch(error) {
            setOpen(true)
        }
    }
    return (
        <div className="mx-4 overflow-y-auto overflow-x-hidden">
            <div className="bg-white mx-4 mt-5 p-5 border rounded-xl">
                <CustomAlertDialog title="Thông báo"
                                   content="Đã có lỗi xảy ra"
                                   btName={POPUP_PRODUCT.Ok}
                                   open={open}
                                   handleClickClose={() => setOpen(false)}/>
                <div className="flex flex-col gap-y-16">
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography
                                component={'span'}
                                className="text-blue-600 font-bold text-xl">{"THAY ĐỔI".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'span'}>
                                <div className="flex flex-col">
                                    <div>
                                        <span>Thay đổi thông tin đợt bán.&nbsp;</span>
                                        <span className="text-red-600">
                                            (Nếu sản phẩm hiện đang đăng bán sẽ không thể thực hiện thay đổi)
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="contained"
                                                className="bg-blue-500 text-white w-60"
                                                disabled={data.currentSaleQuantity !== 0}
                                                onClick={() => {
                                                    if (data.currentSaleQuantity === 0) {
                                                        router.push(`${APP_PATH.SELLER.CAMPAIGN_EDIT}/${data.id}`)
                                                    }
                                                }}
                                                startIcon={
                                                    <PencilAltIcon
                                                        className="h-10 w-10"
                                                    />}>
                                            <span className="text-xl">Thay đổi</span>
                                        </Button>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                component={'span'}
                                className="text-red-600 font-bold text-xl">{"Dừng Bán".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'span'}>
                                <div className="flex flex-col">
                                    <div>
                                        <span>Kết thúc đợt bán ngay lập tức.&nbsp;</span>
                                        <span className="text-red-600">
                                            (Sản phẩm muốn kết thúc phải có số lượng bán dưới 2/3 mốc)
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="contained"
                                                color="error"
                                                className="bg-red-500 text-white w-60"
                                                disabled={!isAvailableToCancel(data)}
                                                onClick={() => {
                                                    if (isAvailableToCancel(data)) {
                                                        handleForcedCancel()
                                                    }
                                                }}
                                                startIcon={
                                                    <StopCircle
                                                        className="h-10 w-10"
                                                    />}>
                                            <span className="text-xl">Ngừng bán</span>
                                        </Button>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography
                                component={'span'}
                                className="text-red-600 font-bold text-xl">{"Xóa".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'span'}>
                                <div className="flex flex-col">
                                    <div>
                                        <span>Xóa dữ liệu đợt bán.&nbsp;</span>
                                        <span className="text-red-600">
                                            (Nếu sản phẩm đang được đăng bán sẽ không thể xóa cho tới khi nó kết thúc)
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="contained"
                                                color="error"
                                                className="bg-red-500 text-white w-60"
                                            // onClick={() => router.back()}
                                                startIcon={
                                                    <DeleteIcon
                                                        className="h-10 w-10"
                                                    />}>
                                            <span className="text-xl">Xóa đợt bán</span>
                                        </Button>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Setting;