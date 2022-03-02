import React from "react";
//@ts-ignore
import {Slide} from 'react-slideshow-image';
//@ts-ignore
import ShowMoreText from "react-show-more-text";
//@ts-ignore
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-slideshow-image/dist/styles.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import {PAGE_REQUEST} from "../../../shared/enum/enum";
import {Divider} from "@mui/material";
import {IProduct} from "../../../shared/models/IProduct";
import {matchProductStatusDisplayType} from "../../../utils/PageRequestUtils";
import PRODUCT_DISPLAY = PAGE_REQUEST.STATUS.PRODUCT.PRODUCT_DISPLAY;
import NumberFormat from "../../../utils/NumberFormat";
import {DateFormat} from "../../../utils/DateFormat";

const slideShowProps = {
    indicators: true,
    scale: 2
}

interface ProductProps {
    data: IProduct;
}



const GeneralInfo: React.FC<ProductProps> = (props) => {
    const {data} = props;
    return (
        <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
            <div
                className="bg-white mx-4 mt-5 p-5 min-h-screen border rounded-xl">
                <div className="grid grid-cols-12">
                    <div className="col-start-1 col-span-4">
                        {data && <div className="slide-container mt-20">
                            <Slide {...slideShowProps}>
                                {data.productImages?.map((image, index) => (
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
                                {matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ACTIVE)
                                && <span className="font-bold text-green-500">SẴN SÀNG</span>}
                                {matchProductStatusDisplayType(data.status, PRODUCT_DISPLAY.ON_SALE)
                                && <span className="font-bold text-orange-500">ĐANG BÁN</span>}
                            </div>
                            <Divider className="col-span-2 my-5"/>
                            <div>
                                Ngày khởi tạo:
                            </div>
                            <div>
                                {DateFormat(data.createdAt)}
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
                                Giá gốc:
                            </div>
                            <div>
                                {NumberFormat(data.originalPrice)}đ
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