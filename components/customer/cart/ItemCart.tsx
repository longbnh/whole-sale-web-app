import Image from "next/image";
import React, { useState } from "react";

import { Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import NumberFormat from "../../../utils/NumberFormat";

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
}));

interface ItemCartProps {}

const ItemCart: React.FC<ItemCartProps> = (props) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState<number>(0);

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    let quantity = Number.parseInt(event.target.value);
    if (quantity >= 0) {
      setQuantity(quantity);
    }
    event.target.value.length === 0 ? setQuantity(0) : null;
  };

  return (
    <div className="flex w-ful">
      <Checkbox classes={{ root: classes.root }} color="default" />
      <Image src={"https://i.imgur.com/Jcls8b5.png"} width={90} height={90} />
      <div className="w-1/3 text-sm mx-3">
        Electric knife sharpener 2 Stage home use double stage for Ceramic
        Knives and Stainless Steel Knives
      </div>
      {/* quantity field */}
      <div className="my-auto px-5 pb-6 flex">
        <div className="block" style={{ width: "60px" }}>
          <div className="relative">
            <div className="font-normal text-base box-border cursor-text inline-flex text-center w-full leading-4 relative">
              <input
                type="text"
                id="quantity"
                onChange={handleChangeQuantity}
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
      <div className="my-auto pb-6 flex px-5">
        <div className="text-red-600 text-lg pb-5 relative">
          {NumberFormat(45000000)}đ
          <div className="absolute bottom-1 right-0 line-through decoration-2 text-black text-sm">
            {NumberFormat(50000000)}đ
          </div>
        </div>
      </div>
      {/* Total */}
      <div className="my-auto pb-6 flex px-5">
        <div className="text-red-600 text-lg  relative">
          {NumberFormat(90000000)}đ
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
