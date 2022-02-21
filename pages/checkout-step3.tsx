import { ReactElement } from "react";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";
import CheckOutPage from "../components/customer/checkout-step3";
import { getProcessCheckoutLayout } from "../components/customer/UI/layoutProcessCheckout";

export default function CheckoutStep3() {
  return <CheckOutPage />;
}

CheckoutStep3.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(getProcessCheckoutLayout(page, "Thanh toán"));
};
