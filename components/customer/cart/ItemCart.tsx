import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import NumberFormat from "../../../utils/NumberFormat";
import { ICartItem } from "../../../shared/models/ICartItem";
import { ITotal } from ".";
import Link from "next/link";
import cartApi from "../../../api/cartApi";
import { SWRInfiniteResponse } from "swr/infinite/dist/infinite";
import { IPagination } from "../../../shared/models/IPagination";
import { useDispatch } from "react-redux";
import { setCart } from "../../../shared/slices/CartSlice";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
}));

interface ItemCartProps {
  item: ICartItem;
  setListTotal: React.Dispatch<React.SetStateAction<ITotal[]>>;
  swr: SWRInfiniteResponse<IPagination<ICartItem>, any>;
  listTotal: ITotal[];
}

const ItemCart: React.FC<ItemCartProps> = (props) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState<number>(props.item.quantity);

  const dispatch = useDispatch();

  useEffect(() => {}, [props.listTotal]);

  let currentPrice = props.item
    .campaign!.mileStones.sort(
      (a, b) => a.requiredSaleQuantity - b.requiredSaleQuantity
    )
    .reverse()
    .find(
      (milestone) =>
        milestone.requiredSaleQuantity <=
        props.item.campaign!.currentSaleQuantity
    )?.price;

  let originPrice = props.item.campaign!.mileStones.find(
    (item) => item.milestoneNumber === 0
  )?.price;

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    let quantity = Number.parseInt(event.target.value);
    if (quantity >= 0) {
      setQuantity(quantity);
      if (
        props.listTotal.find(
          (item) => item.campaignId === props.item.campaign!.id
        )
      ) {
        const temp = [...props.listTotal];
        temp.find(
          (item) => item.campaignId === props.item.campaign!.id
        )!.totalPrice = (currentPrice as number) * quantity;
        temp.find(
          (item) => item.campaignId === props.item.campaign!.id
        )!.quantity = quantity;
        props.setListTotal(temp);
      }
    }
    event.target.value.length === 0 ? setQuantity(0) : null;
  };

  const updateItemQuantity = async () => {
    if (quantity > 0) {
      await cartApi.updateQuantityItem(props.item.productId, quantity);
    } else {
      await cartApi.deleteItemCart(props.item.productId);
    }
  };

  const deleteItem = async () => {
    const findItemCart =
      props.listTotal &&
      props.listTotal.find(
        (item) => item.campaignId === props.item.campaign!.id
      );
    if (findItemCart !== undefined) {
      let index = props.listTotal.findIndex(
        (item) => item.campaignId === props.item.campaign!.id
      );
      let temp = [...props.listTotal];
      temp.splice(index, 1);
      props.setListTotal(temp);
    }
    await cartApi.deleteItemCart(props.item.productId);
    props.swr.mutate();
    dispatch(setCart());
  };

  return (
    <div className="flex w-ful">
      <Checkbox
        id={props.item.campaign!.id.toString()}
        classes={{ root: classes.root }}
        color="default"
        key={props.item.campaign!.id.toString()}
        onChange={(event, checked) => {
          if (checked) {
            props.setListTotal([
              ...props.listTotal,
              {
                campaignId: props.item.campaign!.id,
                totalPrice: (currentPrice as number) * quantity,
                quantity: quantity,
                productId: props.item.productId,
              },
            ]);
          } else {
            props.setListTotal(
              props.listTotal.filter(
                (item) => item.campaignId !== props.item.campaign!.id
              )
            );
          }
        }}
      />
      <Image src={props.item.imageUrl} width={90} height={90} />
      <Link href={`campaign/${props.item.campaign?.id}`}>
        <div className="w-1/3 text-sm mx-3 hover:text-red-400 cursor-pointer">
          {props.item.name}
        </div>
      </Link>

      {/* quantity field */}
      <div className="my-auto px-5 pb-6 flex">
        <div className="block" style={{ width: "60px" }}>
          <div className="relative">
            <div className="font-normal text-base box-border cursor-text inline-flex text-center w-full leading-4 relative">
              <input
                type="text"
                id="quantity"
                onChange={handleChangeQuantity}
                onBlur={updateItemQuantity}
                value={quantity}
                className="h-3 text-base rounded-md overflow-visible w-full box-content py-3 px-4"
                style={{
                  border: "1px solid rgb(210, 210, 210)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Price */}
      <div className="my-auto pb-6 flex px-5 w-32 justify-end">
        <div className="text-red-600 text-lg pb-5 relative">
          {NumberFormat(currentPrice as number)}đ
          <div className="absolute bottom-1 right-0 line-through decoration-2 text-black text-sm">
            {NumberFormat(originPrice as number)}đ
          </div>
        </div>
      </div>
      {/* Total */}
      <div className="my-auto pb-6 flex justify-end w-32">
        <div className="text-red-600 text-lg  relative">
          {NumberFormat((currentPrice as number) * quantity)}đ
        </div>
      </div>
      {/* Delete icon */}
      <div
        className="my-auto pb-6 pl-4 cursor-pointer hover:opacity-70"
        onClick={deleteItem}
      >
        <DeleteIcon fontSize="small" />
      </div>
    </div>
  );
};

export default ItemCart;
