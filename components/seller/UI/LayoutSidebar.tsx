import React, { ReactElement } from "react";
import Sidebar from "./Sidebar";

interface LayoutSidebarProps {
  children: ReactElement;
}

const LayoutSidebar: React.FC<LayoutSidebarProps> = ({ children }) => {
  return (
    <div className="relative flex flex-row w-full">
      <Sidebar />
      {children}
    </div>
  );
};

export const getSidebarLayout = (content: ReactElement) => (
  <LayoutSidebar>{content}</LayoutSidebar>
);

export default LayoutSidebar;
