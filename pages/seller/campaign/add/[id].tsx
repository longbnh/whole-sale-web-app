import {ReactElement} from "react";
import {getSellerLayout} from "../../../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../../../components/seller/UI/LayoutSidebar";
import ShopCampaign from "../../../../components/seller/shop-add-campaign";

export default function ShopAddCampaign() {
    return <ShopCampaign />;
}

ShopAddCampaign.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
