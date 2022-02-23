import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Checkbox, Divider, Skeleton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemCart from "./ItemCart";
import { ICartItem } from "../../../shared/models/ICartItem";
import { ITotal } from ".";

interface CartProps {
  cartList?: ICartItem[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setListTotal: React.Dispatch<React.SetStateAction<ITotal[]>>;
  listTotal: ITotal[];
}

const Cart: React.FC<CartProps> = (props) => {
  const router = useRouter();
  // const orderId = router.query.id;

  // console.log(props.cartList);
  // const [listCampaign, setListCampaign] = useState<ICartItem[]>([]);
  // useEffect(() => {
  //   if (listCampaign.length === 0) {
  //     setListCampaign(props.cartList as ICartItem[]);
  //   } else {
  //     setListCampaign([
  //       ...(listCampaign as ICartItem[]),
  //       ...(props.cartList as ICartItem[]),
  //     ]);
  //   }
  // }, [props.page]);

  return (
    <div className="w-full px-2">
      <div className="w-ful flex items-center">
        <Checkbox
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          color="default"
        />
        <div className="font-medium" style={{ width: "calc(35% + 90px)" }}>
          Sản phẩm
        </div>
        <div className="font-medium mx-6">Số lượng</div>
        <div className="font-medium mx-10">Giá tiền</div>
        <div className="font-medium mx-8">Tạm tính</div>

        <div className="pr-2 cursor-pointer hover:opacity-75">
          <DeleteIcon sx={{ fontSize: 28 }} />
        </div>
      </div>
      <Divider />
      <div className="my-4">
        {props.cartList !== undefined ? (
          props.cartList!.map((item, key) => {
            return (
              <div key={key} className="py-2">
                <ItemCart
                  item={item}
                  setListTotal={props.setListTotal}
                  listTotal={props.listTotal}
                />
                {key !== props.cartList!.length - 1 ? (
                  <Divider sx={{ margin: "12px 0px" }} />
                ) : (
                  <></>
                )}
              </div>
            );
          })
        ) : (
          <Skeleton animation="wave" />
        )}
      </div>
    </div>
  );
};

export default Cart;
