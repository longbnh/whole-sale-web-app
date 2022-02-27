import React, { useEffect, useState } from "react";
import { LOCAL_STORAGE } from "../../../shared/enum/enum";
import Cart from "./Cart";
import Total from "./Total";

export interface ITotal {
  id: number;
  totalPrice: number;
  quantity?: number;
}

const CartPage = () => {
  const [listTotal, setListTotal] = useState<ITotal[]>([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      const listChecked = window.localStorage.getItem(LOCAL_STORAGE.CART_ITEM);
      const list: ITotal[] = JSON.parse(listChecked!);
      if (list !== null) {
        // console.log(list);
        setListTotal(list);
      }
    }
  }, []);

  return (
    <div className="mx-auto h-fit pb-10 w-1200 relative flex items-start">
      <div className="w-70% rounded-lg bg-white">
        <Cart setListTotal={setListTotal} listTotal={listTotal} />
      </div>
      <div className="w-30% sticky top-0 self-start z-30">
        <Total listTotal={listTotal} />
      </div>
    </div>
  );
};

export default CartPage;
