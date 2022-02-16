import React, { ReactElement } from "react";
import Header from "../header/header";

interface LayoutCustomerProps {
  children: ReactElement;
}

const LayoutCustomer: React.FC<LayoutCustomerProps> = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="">{children}</div>
    </div>
  );
};

export const getCustomerLayout = (page: ReactElement) => (
  <LayoutCustomer>{page}</LayoutCustomer>
);

export default LayoutCustomer;
