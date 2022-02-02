import RegisterSeller from "../../components/seller/registerShop";
import {ReactElement} from "react";
import {getSellerLayout} from "../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../components/seller/UI/LayoutSidebar";

export default function RegisterInfo() {
    return <RegisterSeller/>
};

RegisterInfo.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(page);
};