import {ReactElement} from "react";
import {getSellerLayout} from "../../../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../../../components/seller/UI/LayoutSidebar";
import ShopCampaign from "../../../../components/seller/shop-edit-campaign";

export default function ShopEditCampaign() {
    return <ShopCampaign />;
}

ShopEditCampaign.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
