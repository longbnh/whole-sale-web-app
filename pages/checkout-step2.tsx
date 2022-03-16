import { ReactElement } from "react";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";
import ChooseAddress from "../components/customer/checkout-step2";
import { getProcessCheckoutLayout } from "../components/customer/UI/layoutProcessCheckout";

export default function CheckoutStep2() {
  return <ChooseAddress />;
}

CheckoutStep2.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(
    getProcessCheckoutLayout(page, "Thông tin giao hàng")
  );
};
