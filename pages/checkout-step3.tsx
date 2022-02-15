import {ReactElement} from "react";
import {getCustomerLayout} from "../components/customer/UI/layoutCustomer";
import CheckOutPage from "../components/customer/checkout-step3";

export default function CheckoutStep3() {
    return <CheckOutPage/>
}

CheckoutStep3.getLayout = function getLayout(page: ReactElement) {
    return getCustomerLayout(page);
};