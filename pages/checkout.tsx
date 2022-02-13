import {ReactElement} from "react";
import {getCustomerLayout} from "../components/customer/UI/layoutCustomer";
import CheckOutPage from "../components/customer/checkout";

export default function Checkout() {
    return <CheckOutPage/>
}

Checkout.getLayout = function getLayout(page: ReactElement) {
    return getCustomerLayout(page);
};