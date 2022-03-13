import { ReactElement } from "react";
import { getCustomerLayout } from "../components/customer/UI/layoutCustomer";
import Result from "../components/customer/transaction-result";

export default function TransactionResult() {
    return <Result />;
}

TransactionResult.getLayout = function getLayout(page: ReactElement) {
    return getCustomerLayout(page);
};
