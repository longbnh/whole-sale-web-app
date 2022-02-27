import {ReactElement} from "react";
import {getSellerLayout} from "../../../components/seller/UI/layoutSeller";
import ShopCampaignDetail from "../../../components/seller/shop-campaign-detail";
import {getSidebarLayout} from "../../../components/seller/UI/LayoutSidebar";

export default function CampaignDetail() {
    return <ShopCampaignDetail/>;
}

CampaignDetail.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(getSidebarLayout(page));
};
