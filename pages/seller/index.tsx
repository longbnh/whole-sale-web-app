import { getSellerLayout } from "../../components/seller/LayoutSeller";

import Dashboard from "../../components/seller/dashboard";
import { ReactElement } from "react";

export default function index() {
  return <Dashboard />;
}

index.getLayout = function getLayout(page: ReactElement) {
  return getSellerLayout(page);
};
