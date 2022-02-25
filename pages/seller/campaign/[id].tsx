import {ReactElement} from "react";
import {getSellerLayout} from "../../../components/seller/UI/layoutSeller";
import ShopCampaignDetail from "../../../components/seller/shop-campaign-detail";

export default function CampaignDetail() {
    return <ShopCampaignDetail/>;
}

CampaignDetail.getLayout = function getLayout(page: ReactElement) {
    return getSellerLayout(page);
};
