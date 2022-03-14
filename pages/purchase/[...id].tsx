import { ReactElement } from "react";
import OrderHistoryDetail from "../../components/customer/order-history-detail";
import { getCustomerLayout } from "../../components/customer/UI/layoutCustomer";
import { getSidebarLayoutPurchase } from "../../components/customer/UI/LayoutSidebarPurchase";

export default function Purchase() {
  return <OrderHistoryDetail />;
}

Purchase.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(getSidebarLayoutPurchase(page));
};
