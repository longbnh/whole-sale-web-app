import { ReactElement } from "react";
import DashboardCustomer from "../components/customer/dashboard";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";

export default function HomePage() {
  return <DashboardCustomer />;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(page);
};
