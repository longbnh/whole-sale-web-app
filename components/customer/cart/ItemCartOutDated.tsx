import Image from "next/image";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import { ICartItem } from "../../../shared/models/ICartItem";
import cartApi from "../../../api/cartApi";
import { SWRInfiniteResponse } from "swr/infinite/dist/infinite";
import { IPagination } from "../../../shared/models/IPagination";
import { useDispatch } from "react-redux";
import { setCart } from "../../../shared/slices/CartSlice";

interface ItemCartOutDatedProps {
  swr: SWRInfiniteResponse<IPagination<ICartItem>, any>;
  item: ICartItem;
}

const ItemCartOutDated: React.FC<ItemCartOutDatedProps> = (props) => {
  const dispatch = useDispatch();

  const deleteItem = async () => {
    await cartApi.deleteItemCart(props.item.productId);
    props.swr.mutate();
    dispatch(setCart());
  };

  return (
    <div className="flex mx-1 pl-10">
      <Image src={props.item.imageUrl} width={90} height={90} />
      <div className="w-1/3 text-sm mx-3 hover:text-red-400 cursor-pointer">
        {props.item.name}
      </div>

      <div className="text-2xl uppercase text-red-500 w-1/3"> đã bán hết </div>

      {/* Delete icon */}
      <div
        className="my-auto pb-6 pl-4 cursor-pointer hover:opacity-70 w-1/4 justify-end flex "
        onClick={deleteItem}
      >
        <DeleteIcon fontSize="small" />
      </div>
    </div>
  );
};

export default ItemCartOutDated;
