import React, { useState, useEffect } from "react";
import Cart from "./Cart";
import Total from "./Total";

const CartPage = () => {
  return (
    <div className="w-full h-fit relative">
      <div className="mx-auto h-fit pb-10 w-1200 relative">
        <div className="text-2xl font-semibold tracking-wide my-4">
          Giỏ hàng của tôi
        </div>
        <div className="flex h-fit items-start">
          <div className="w-70% mt-5 rounded-lg bg-white">
            <Cart />
          </div>
          <div className="w-30% sticky top-0 self-start z-30">
            <Total />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
