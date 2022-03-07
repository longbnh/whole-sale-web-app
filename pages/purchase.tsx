import { ReactElement } from "react";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";
import OrderHistoryPage from "../components/customer/order-history";
import { getSidebarLayoutPurchase } from "../components/customer/UI/LayoutSidebarPurchase";

export default function Purchase() {
  return <OrderHistoryPage />;
}

Purchase.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(getSidebarLayoutPurchase(page));
};
