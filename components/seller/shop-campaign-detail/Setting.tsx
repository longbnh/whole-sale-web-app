import React from "react";
import {ICampaign} from "../../../shared/models/ICampaign";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PencilAltIcon} from "@heroicons/react/solid";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {Cancel} from "@mui/icons-material";

const slideShowProps = {
    indicators: true,
    scale: 2
}

interface CampaignProps {
    data: ICampaign;
}



const Setting: React.FC<CampaignProps> = (props) => {
    const {data} = props;
    return (
        <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
            <div className="bg-white mx-4 mt-5 p-5 max-h-full border rounded-xl">
                <div className="flex flex-col gap-y-16">
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="text-blue-600 font-bold text-xl">{"THAY ĐỔI".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
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
                                            // onClick={() => router.back()}
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
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="text-green-600 font-bold text-xl">{"Đăng bán".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div className="flex flex-col">
                                    <div>
                                        <span>Đăng bán sản phẩm.&nbsp;</span>
                                        <span className="text-red-600">
                                            (Một khi đã đăng bán, các tính năng còn lại sẽ bị hạn chế)
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="contained"
                                                color="success"
                                                className="bg-green-500 text-white w-60"
                                            // onClick={() => router.back()}
                                                startIcon={
                                                    <SendIcon
                                                        className="h-10 w-10"
                                                    />}>
                                            <span className="text-xl">Đăng bán</span>
                                        </Button>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="text-orange-600 font-bold text-xl">{"Hủy bán".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div className="flex flex-col">
                                    <div>
                                        <span>Hủy đợt bán.&nbsp;</span>
                                        <span className="text-red-600">
                                            (Nếu sản phẩm đã được mua sẽ không thể hủy bán)
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="contained"
                                                className="bg-orange-500 text-white w-60"
                                                color="warning"
                                            // onClick={() => router.back()}
                                                startIcon={
                                                    <Cancel
                                                        className="h-10 w-10"
                                                    />}>
                                            <span className="text-xl">Hủy bán</span>
                                        </Button>
                                    </div>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className="text-red-600 font-bold text-xl">{"Xóa".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
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