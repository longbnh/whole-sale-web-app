import React, { ReactElement } from "react";
import Steppers from "../stepper/Stepper";

interface LayoutProcessCheckoutProps {
  title: string;
  children: ReactElement;
}

const LayoutProcessCheckout: React.FC<LayoutProcessCheckoutProps> = ({
  children,
  title,
}) => {
  return (
    <div className="w-full h-fit relative">
      <div className="mx-auto w-1200 bg-white my-4 rounded-lg flex justify-between">
        <div className="text-2xl font-semibold tracking-wide my-4 pl-3">
          {title}
        </div>
        <div className="w-3/5 my-3">
          <Steppers />
        </div>
      </div>
      {children}
    </div>
  );
};

export const getProcessCheckoutLayout = (page: ReactElement, title: string) => (
  <LayoutProcessCheckout title={title}>{page}</LayoutProcessCheckout>
);

export default LayoutProcessCheckout;
