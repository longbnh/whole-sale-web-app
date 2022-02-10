import { ReactElement } from "react";
import { getSellerLayout } from "../../components/seller/UI/layoutSeller";
import { getSidebarLayout } from "../../components/seller/UI/LayoutSidebar";
import AddListProduct from "../../components/seller/add-list-product";

export default function addListProduct() {
  return <AddListProduct />;
}

addListProduct.getLayout = function getLayout(page: ReactElement) {
  return getSellerLayout(getSidebarLayout(page));
};
