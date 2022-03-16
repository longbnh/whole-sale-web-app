import {ReactElement} from "react";
import {getSellerLayout} from "../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../components/seller/UI/LayoutSidebar";
import ShopProduct from "../../components/seller/shop-product";

export default function ShopAddProduct() {
    return <ShopProduct />;
}

ShopAddProduct.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
