import React, { ReactElement } from "react";
import Header from "../header/header";

interface LayoutCustomerProps {
  children: ReactElement;
}

const LayoutCustomer: React.FC<LayoutCustomerProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="">{children}</div>
    </>
  );
};

export const getCustomerLayout = (page: ReactElement) => (
  <LayoutCustomer>{page}</LayoutCustomer>
);

export default LayoutCustomer;
