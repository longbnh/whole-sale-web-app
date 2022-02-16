import React from "react";
import { useRouter } from "next/router";
import { Checkbox, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemCart from "./ItemCart";

interface CartProps {}

const Cart: React.FC<CartProps> = (props) => {
  const router = useRouter();
  // const orderId = router.query.id;
  const temp = ["", "", "", "", "", ""];
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
        {temp.map((item, key) => {
          return (
            <div key={key} className="py-2">
              <ItemCart />
              {key !== temp.length - 1 ? (
                <Divider sx={{ margin: "12px 0px" }} />
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
