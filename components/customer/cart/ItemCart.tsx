import Image from "next/image";
import React, { useState } from "react";

import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import NumberFormat from "../../../utils/NumberFormat";
import { ICartItem } from "../../../shared/models/ICartItem";
import { ITotal } from ".";

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
  listTotal: ITotal[];
}

const ItemCart: React.FC<ItemCartProps> = (props) => {
  const classes = useStyles();
  // const [quantity, setQuantity] = useState<number>(0);

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
      props.item.quantity = quantity;
    }
    event.target.value.length === 0 ? (props.item.quantity = 0) : null;
  };

  return (
    <div className="flex w-ful">
      <Checkbox
        classes={{ root: classes.root }}
        color="default"
        onChange={(event, checked) => {
          if (checked) {
            props.setListTotal([
              ...props.listTotal,
              {
                id: props.item.campaign!.id,
                totalPrice: (currentPrice as number) * props.item.quantity,
              },
            ]);
          } else {
            props.setListTotal(
              props.listTotal.filter((item) => item.id !== props.item.productId)
            );
          }
        }}
      />
      <Image src={props.item.imageUrl} width={90} height={90} />
      <div className="w-1/3 text-sm mx-3">{props.item.name}</div>
      {/* quantity field */}
      <div className="my-auto px-5 pb-6 flex">
        <div className="block" style={{ width: "60px" }}>
          <div className="relative">
            <div className="font-normal text-base box-border cursor-text inline-flex text-center w-full leading-4 relative">
              <input
                type="text"
                id="quantity"
                onChange={handleChangeQuantity}
                defaultValue={props.item.quantity}
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
      <div className="my-auto pb-6 flex px-5">
        <div className="text-red-600 text-lg pb-5 relative">
          {NumberFormat(currentPrice as number)}đ
          <div className="absolute bottom-1 right-0 line-through decoration-2 text-black text-sm">
            {NumberFormat(originPrice as number)}đ
          </div>
        </div>
      </div>
      {/* Total */}
      <div className="my-auto pb-6 flex px-5">
        <div className="text-red-600 text-lg  relative">
          {NumberFormat((currentPrice as number) * props.item.quantity)}đ
        </div>
      </div>
      {/* Delete icon */}
      <div className="my-auto pb-6 cursor-pointer hover:opacity-70">
        <DeleteIcon fontSize="small" />
      </div>
    </div>
  );
};

export default ItemCart;
