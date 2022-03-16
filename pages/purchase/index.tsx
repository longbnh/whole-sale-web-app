import { ReactElement } from "react";
import OrderHistoryPage from "../../components/customer/order-history";
import { getCustomerLayout } from "../../components/customer/UI/layoutCustomer";
import { getSidebarLayoutPurchase } from "../../components/customer/UI/LayoutSidebarPurchase";

export default function Purchase() {
  return <OrderHistoryPage />;
}

Purchase.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(getSidebarLayoutPurchase(page));
};
