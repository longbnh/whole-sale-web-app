import React, { ReactElement } from "react";
import Header from "./header/header";

interface LayoutSellerProps {
  children: ReactElement;
}

const LayoutSeller: React.FC<LayoutSellerProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export const getSellerLayout = (page: ReactElement) => (
  <LayoutSeller>{page}</LayoutSeller>
);

export default LayoutSeller;
