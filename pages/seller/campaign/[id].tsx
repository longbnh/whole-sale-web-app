import {ReactElement} from "react";
import {getSellerLayout} from "../../../components/seller/UI/layoutSeller";
import {getSidebarLayout} from "../../../components/seller/UI/LayoutSidebar";
import ShopCampaignDetail from "../../../components/seller/shop-campaign-detail";
import {getScrollableLayout} from "../../../components/seller/UI/ScrollToTop";

export default function CampaignDetail() {
    return <ShopCampaignDetail/>;
}

CampaignDetail.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(page);
};
