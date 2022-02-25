import Image from "next/image";
import React from "react";
import ProductItem from "./ProductItem";
import { useRouter } from "next/router";
import { ICampaignItem } from "../../../shared/models/ICampaignItem";

interface HotdealProps {
  title: string | any;
  imgLink: string;
  listCampaign: ICampaignItem[];
}

const Hotdeal: React.FC<HotdealProps> = (props) => {
  const route = useRouter();

  const handleCallCampaign = () => {
    route.push("/campaign/1");
  };
  return (
    <div className="w-full flex" style={{ height: "400px" }}>
      <div className="w-1/4 rounded-lg relative">
        <Image
          src={props.imgLink}
          className={"rounded-l-lg align-top"}
          width={280}
          height={400}
        />

        {props.title}

        <div
          className="absolute w-32 text-center py-1.5 text-red-400 font-semibold text-lg bg-white rounded-3xl cursor-pointer hover:bg-slate-100"
          style={{ top: "17%", left: "25%" }}
        >
          Xem thêm
        </div>
      </div>
      <ProductItem listCampaign={props.listCampaign} />
    </div>
  );
};

export default Hotdeal;
