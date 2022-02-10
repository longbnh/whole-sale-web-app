import { ReactElement } from "react";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";

export default function HomePage() {
  return <></>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(page);
};
