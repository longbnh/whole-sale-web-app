import {ReactElement} from "react";
import {getSellerLayout} from "../../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../../components/seller/UI/LayoutSidebar";
import ShopProductDetail from "../../../components/seller/shop-product-detail";

export default function ProductDetail() {
    return <ShopProductDetail/>;
}

ProductDetail.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
