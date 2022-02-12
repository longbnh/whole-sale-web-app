import { ReactElement } from "react";
import { getCustomerLayout } from "../../components/customer/UI/layoutCustomer";
import CampaignDetail from "../../components/customer/campaign";

export default function Campaign() {
    return <CampaignDetail/>;
}

Campaign.getLayout = function getLayout(page: ReactElement) {
    return getCustomerLayout(page);
};
