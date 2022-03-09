import React from "react";
import { useRouter } from "next/router";
import useSWRInfinite from "swr/infinite";
import { Checkbox, Divider, Skeleton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemCart from "./ItemCart";
import { ICartItem } from "../../../shared/models/ICartItem";
import { ITotal } from ".";
import cartApi from "../../../api/cartApi";
import { IPagination } from "../../../shared/models/IPagination";
import InfiniteScroll from "react-swr-infinite-scroll";
import ItemCartOutDated from "./ItemCartOutDated";

interface CartProps {
  setListTotal: React.Dispatch<React.SetStateAction<ITotal[]>>;
  listTotal: ITotal[];
}

const Cart: React.FC<CartProps> = (props) => {
  const router = useRouter();

  const getKey = (
    pageIndex: number,
    previousPageData: IPagination<ICartItem>
  ) => {
    if (previousPageData && previousPageData.isLastPage) return null;
    return { Page: pageIndex + 1, PageSize: 10 };
  };

  const swr = useSWRInfinite(getKey, cartApi.getCart, {
    refreshInterval: 5000,
  });

  return (
    <div className="w-full px-2">
      <div className="w-ful flex items-center">
        <Checkbox
          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          color="default"
        />
        <div className="font-medium" style={{ width: "calc(49%)" }}>
          Sản phẩm
        </div>
        <div className="font-medium w-16">Số lượng</div>
        <div className="font-medium w-1/6 flex justify-end pr-4">Giá tiền</div>
        <div className="font-medium w-1/6 flex justify-end pr-1">Tạm tính</div>

        {/* <div className="pr-2 cursor-pointer hover:opacity-75">
          <DeleteIcon sx={{ fontSize: 28 }} />
        </div> */}
      </div>
      <Divider />
      <div className="my-4">
        <InfiniteScroll
          swr={swr}
          loadingIndicator={
            <div className="pt-4 mx-3">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </div>
          }
          isReachingEnd={(swr) => {
            return swr.data && swr.data.at(0).content.length === 0;
          }}
        >
          {(response) =>
            (response as IPagination<ICartItem>).content
              // .filter((item) => item.hasCampaign === true)
              .map((item, key) => {
                return (
                  <div key={key} className="py-2">
                    {item.hasCampaign ? (
                      <ItemCart
                        item={item}
                        setListTotal={props.setListTotal}
                        listTotal={props.listTotal}
                        swr={swr}
                      />
                    ) : (
                      <ItemCartOutDated item={item} swr={swr} />
                    )}
                    {key !==
                    // .filter((item) => item.hasCampaign === true)
                    (response as IPagination<ICartItem>).content.length - 1 ? (
                      <Divider sx={{ margin: "12px 0px" }} />
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
          }
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Cart;
