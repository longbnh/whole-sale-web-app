import {ReactElement} from "react";
import {getSellerLayout} from "../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../components/seller/UI/LayoutSidebar";
import CampaignList from "../../components/seller/shop-campaign";

export default function ShopCampaign() {
    return <CampaignList />;
}

ShopCampaign.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
