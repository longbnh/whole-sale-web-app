import React from "react";
import {ICampaign} from "../../../shared/models/ICampaign";
import {Slide} from 'react-slideshow-image';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-slideshow-image/dist/styles.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import {PAGE_REQUEST} from "../../../shared/enum/enum";
import {Divider} from "@mui/material";
import {DateFormat} from "../../../utils/DateFormat";
import {matchCampaignStatusDisplayType} from "../../../utils/PageRequestUtils";
import CAMPAIGN_DISPLAY = PAGE_REQUEST.STATUS.CAMPAIGN.CAMPAIGN_DISPLAY;

const slideShowProps = {
    indicators: true,
    scale: 2
}

interface CampaignProps {
    data: ICampaign;
}



const GeneralInfo: React.FC<CampaignProps> = (props) => {
    const {data} = props;
    return (
        <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
            <div
                className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-span-4">
                        {data && <div className="slide-container mt-20">
                            <Slide {...slideShowProps}>
                                {data.images?.map((image, index) => (
                                    <div className="each-slide max-h-full" key={index}>
                                        <InnerImageZoom src={image.url}
                                                        zoomSrc={image.url}
                                                        className="max-h-96 max-w-96"/>
                                    </div>
                                ))}
                            </Slide>
                        </div>}
                    </div>
                    <div className="col-span-8 col-start-6 mt-16">
                        <div className="grid grid-cols-2 grid-rows-8 gap-y-2 text-xl">
                            <div className="text-2xl font-bold col-span-2 mb-5">
                                {data.name}
                            </div>
                            <div>
                                Trạng thái:
                            </div>
                            <div>
                                {matchCampaignStatusDisplayType(data.status, CAMPAIGN_DISPLAY.ACTIVE)
                                && <span className="font-bold text-green-500">ĐANG BÁN</span>}
                                {matchCampaignStatusDisplayType(data.status, CAMPAIGN_DISPLAY.HIDDEN)
                                && <span className="font-bold text-red-500">ĐÃ ẨN</span>}
                                {matchCampaignStatusDisplayType(data.status, CAMPAIGN_DISPLAY.COMPLETE)
                                && <span className="font-bold text-blue-500">HOÀN THÀNH</span>}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Ngày bắt đầu:
                            </div>
                            <div>
                                {DateFormat(data.startDate)}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Ngày kết thúc:
                            </div>
                            <div>
                                {DateFormat(data.endDate)}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Mô tả:
                            </div>
                            <div>
                                {data.description}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Danh mục:
                            </div>
                            <div>
                                {data.category.name}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Thương hiệu:
                            </div>
                            <div>
                                {data.brand?.name}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Xuất xứ:
                            </div>
                            <div>
                                {data.origin}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralInfo;