import {ReactElement} from "react";
import {getSellerLayout} from "../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../components/seller/UI/LayoutSidebar";
import ProductList from "../../components/seller/shop-list-product";

export default function ShopListProduct() {
    return <ProductList />;
}

ShopListProduct.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
