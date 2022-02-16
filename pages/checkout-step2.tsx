import {ReactElement} from "react";
import {getCustomerLayout} from "../components/customer/UI/layoutCustomer";
import ChooseAddress from "../components/customer/checkout-step2";

export default function CheckoutStep2() {
    return <ChooseAddress/>
}

CheckoutStep2.getLayout = function getLayout(page: ReactElement) {
    return getCustomerLayout(page);
};