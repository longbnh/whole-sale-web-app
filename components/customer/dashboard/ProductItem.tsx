import Image from "next/image";
import React from "react";
import { Rating } from "@mui/material";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";

import NumberFormat from "../../../utils/NumberFormat";
import CustomButtons from "../../commons/CustomButton";
import { ICampaignItem } from "../../../shared/models/ICampaignItem";
import { useRouter } from "next/router";

interface ProductItemProps {
  listCampaign: ICampaignItem[];
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const route = useRouter();
  return (
    <ul className="w-4/5 flex flex-wrap overflow-hidden flex-row mr-5">
      {props.listCampaign.map((item, key) => {
        let currentPrice = item.mileStones
          .sort((a, b) => a.requiredSaleQuantity - b.requiredSaleQuantity)
          .reverse()
          .find(
            (milestone) =>
              milestone.requiredSaleQuantity <= item.currentSaleQuantity
          )?.price;
        let originPrice = item.mileStones.find(
          (item) => item.milestoneNumber === 0
        )?.price;

        return (
          <li
            key={key}
            className="w-22% h-22/25 my-5 ml-5 relative cursor-pointer"
            onClick={() => route.push(`campaign/${item.id}`)}
          >
            <div className="break-words text-sm">
              <Image
                src={item.imageUrl}
                className={
                  "rounded-md cursor-pointer mb-3 hover:scale-110 ease-in-out duration-300"
                }
                width={212}
                height={212}
              />
              <div className="cursor-pointer mt-3 mx-0.5">
                <div className="leading-5 h-10 mb-2 font-normal text-base text-ellipsis line-clamp-2 text-gray-600 overflow-hidden hover:underline">
                  {item.name}
                </div>
                <div className="flex">
                  <Rating
                    name="simple-controlled"
                    value={5}
                    readOnly
                    precision={0.5}
                    onChange={(event, newValue) => {}}
                  />
                  <div className="flex items-center ml-1 text-yellow-500">
                    (200)
                  </div>
                </div>
                <div className="mt-3 flex w-full">
                  <div className="text-red-500 font-semibold text-xl relative">
                    {NumberFormat(currentPrice as number)}đ
                    <div className="text-black font-normal text-sm line-through decoration-2 flex items-end">
                      {NumberFormat(originPrice as number)}đ
                    </div>
                  </div>

                  <div className="relative ml-2 w-11 h-11">
                    <div className="absolute bottom-3 w-full h-full">
                      <div className="absolute z-20 bottom-0 right-0">
                        <Image src={"/fire.svg"} width={43} height={43} />
                      </div>
                      <div className="absolute text-white font-semibold text-xs z-30 top-4 right-2">
                        {
                          //@ts-ignore
                          NumberFormat((1 - currentPrice / originPrice) * 100)
                        }
                        %
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-fit">
              <div className="absolute right-3 -top-2">
                <CustomButtons
                  content={
                    <div className={"fill-white md:flex items-center gap-1 "}>
                      <LocalGroceryStoreIcon height={10} width={10} />
                      <span className="whitespace-nowrap font-medium my-auto">
                        Mua
                      </span>
                    </div>
                  }
                  size="small"
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductItem;
