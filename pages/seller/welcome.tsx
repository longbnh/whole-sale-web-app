import { getSellerLayout } from "../../components/seller/UI/layoutSeller";
import WelcomeSeller from "../../components/seller/welcome";

import { ReactElement } from "react";

export default function WelcomePage() {
  return <WelcomeSeller />;
}

WelcomePage.getLayout = function getLayout(page: ReactElement) {
  return getSellerLayout(page);
};
