import { ReactElement } from "react";

import { getSidebarLayout } from "../../components/seller/UI/LayoutSidebar";
import { getSellerLayout } from "../../components/seller/UI/layoutSeller";
import ShopProfile from "../../components/seller/shop-profile";

export default function ShopInfo() {
  return <ShopProfile />;
}

ShopInfo.getLayout = function getLayout(page: ReactElement) {
  return getSellerLayout(getSidebarLayout(page));
};
