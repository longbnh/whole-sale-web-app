import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PencilAltIcon} from "@heroicons/react/solid";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import {Cancel} from "@mui/icons-material";
import {IProduct} from "../../../shared/models/IProduct";
import {matchProductStatusDisplayType} from "../../../utils/PageRequestUtils";
import {APP_PATH, PAGE_REQUEST} from "../../../shared/enum/enum";
import PRODUCT_DISPLAY = PAGE_REQUEST.STATUS.PRODUCT.PRODUCT_DISPLAY;
import {useRouter} from "next/router";

const slideShowProps = {
    indicators: true,
    scale: 2
}

interface ProductProps {
    data: IProduct;
}


const Setting: React.FC<ProductProps> = (props) => {
    const {data} = props;
    const router = useRouter();
    return (
        <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
            <div className="bg-white mx-4 mt-5 p-5 max-h-full border rounded-xl">
                <div className="flex flex-col gap-y-16">
                    <Accordion defaultExpanded className="bg-gray-300">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
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
                                                disabled={matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ON_SALE)}
                                                onClick={() => {
                                                    if (!matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ON_SALE)) {
                                                        router.push(`${APP_PATH.SELLER.PRODUCT_EDIT}/${data.id}`)
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
                                className="text-green-600 font-bold text-xl">{"Đăng bán".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'span'}>
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
                                                disabled={matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ON_SALE)}
                                                onClick={() => {
                                                    if (!matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ON_SALE)) {
                                                        router.push(`${APP_PATH.SELLER.CAMPAIGN_ADD}/${data.id}`)
                                                    }
                                                }}
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
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography component={'span'} className="text-red-600 font-bold text-xl">{"Xóa".toUpperCase()}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component={'span'}>
                                <div className="flex flex-col">
                                    <div>
                                        <span>Xóa sản phẩm.&nbsp;</span>
                                        <span className="text-red-600">
                                            (Nếu sản phẩm đang được đăng bán sẽ không thể xóa cho tới khi nó kết thúc)
                                        </span>
                                    </div>
                                    <div className="flex justify-end">
                                        <Button variant="contained"
                                                color="error"
                                                className="bg-red-500 text-white w-60"
                                                disabled={matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ON_SALE)}
                                            // onClick={() => router.back()}
                                                startIcon={
                                                    <DeleteIcon
                                                        className="h-10 w-10"
                                                    />}>
                                            <span className="text-xl">Xóa sản phẩm</span>
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