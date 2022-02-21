import { ReactElement } from "react";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";
import CartPage from "../components/customer/cart";
import { getProcessCheckoutLayout } from "../components/customer/UI/layoutProcessCheckout";

export default function Checkout() {
  return <CartPage />;
}

Checkout.getLayout = function getLayout(page: ReactElement) {
  return getCustomerLayout(getProcessCheckoutLayout(page, "Giỏ hàng của tôi"));
};
