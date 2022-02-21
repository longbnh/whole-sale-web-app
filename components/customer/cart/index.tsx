import React from "react";
import Cart from "./Cart";
import Total from "./Total";

const CartPage = () => {
  return (
    <div className="mx-auto h-fit pb-10 w-1200 relative flex items-start">
      <div className="w-70% rounded-lg bg-white">
        <Cart />
      </div>
      <div className="w-30% sticky top-0 self-start z-30">
        <Total />
      </div>
    </div>
  );
};

export default CartPage;
