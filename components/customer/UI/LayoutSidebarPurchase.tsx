import React, { ReactElement } from "react";
import Sidebar from "./Sidebar";

interface LayoutSidebarPurchaseProps {
  children: ReactElement;
}

const LayoutSidebarPurchase: React.FC<LayoutSidebarPurchaseProps> = ({
  children,
}) => {
  return (
    <div className="relative flex flex-row mx-auto h-fit py-4 w-1200 items-start">
      <Sidebar />
      {children}
    </div>
  );
};

export const getSidebarLayoutPurchase = (content: ReactElement) => (
  <LayoutSidebarPurchase>{content}</LayoutSidebarPurchase>
);

export default LayoutSidebarPurchase;
