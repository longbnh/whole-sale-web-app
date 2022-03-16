import {ReactElement} from "react";
import {getSellerLayout} from "../../../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../../../components/seller/UI/LayoutSidebar";
import ShopEditProduct from "../../../../components/seller/shop-product/edit";

export default function ProductEdit() {
    return <ShopEditProduct/>;
}

ProductEdit.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
