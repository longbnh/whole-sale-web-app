import React, { useState } from "react";
import useSWR from "swr";
import cartApi from "../../../api/cartApi";
import { ICartItem } from "../../../shared/models/ICartItem";
import Cart from "./Cart";
import Total from "./Total";

export interface ITotal {
  id: number;
  totalPrice: number;
}

const CartPage = () => {
  const [page, setPage] = useState<number>(1);
  const [listTotal, setListTotal] = useState<ITotal[]>([]);
  const { data, error } = useSWR(
    { Page: page, PageSize: 10 },
    cartApi.getCart,
    {
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );
  console.log(data?.data.content.filter((item) => item.hasCampaign === true));
  return (
    <div className="mx-auto h-fit pb-10 w-1200 relative flex items-start">
      <div className="w-70% rounded-lg bg-white">
        <Cart
          cartList={data?.data.content.filter(
            (item) => item.hasCampaign === true
          )}
          page={page}
          setPage={setPage}
          setListTotal={setListTotal}
          listTotal={listTotal}
        />
      </div>
      <div className="w-30% sticky top-0 self-start z-30">
        <Total listTotal={listTotal} />
      </div>
    </div>
  );
};

export default CartPage;
