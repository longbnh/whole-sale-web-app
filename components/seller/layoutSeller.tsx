import React, { ReactElement } from "react";
import Header from "./header/header";

interface LayoutSellerProps {
  children: ReactElement;
}

const LayoutSeller: React.FC<LayoutSellerProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mt-14">{children}</div>
    </>
  );
};

export const getSellerLayout = (page: ReactElement) => (
  <LayoutSeller>{page}</LayoutSeller>
);

export default LayoutSeller;