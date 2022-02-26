import React, { useState } from "react";
import { Avatar, Divider, TextField } from "@mui/material";
import {
  getLastActiveMilestone,
  getMaxMilestone,
  getMergedMilestone,
} from "../../../shared/utils/CampaignUtils";
import CustomStepper from "../../commons/CustomStepper";
import Button from "@mui/material/Button";
import Countdown from "react-countdown";
import useSWR from "swr";
import campaignApi from "../../../api/campaignApi";
import {useRouter} from "next/router";
import 'react-slideshow-image/dist/styles.css'
//@ts-ignore
import {Slide} from 'react-slideshow-image';
//@ts-ignore
import ShowMoreText from "react-show-more-text";
//@ts-ignore
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Link from 'next/link'
import {APP_PATH, LOCAL_STORAGE} from "../../../shared/enum/enum";
import {IImage} from "../../../shared/models/IImage";
import cartApi from "../../../api/cartApi";

interface TimeRenderProps {
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
}

const renderer = (props: TimeRenderProps) => {
  const days = props.days.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const hours = props.hours.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const minutes = props.minutes.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const seconds = props.seconds.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  return (
    <div className="text-4xl text-red-500 font-bold">
      {days} d &nbsp;
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    </div>
  );
};

const CampaignItem = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR([id], campaignApi.getCampaign, {
    revalidateOnFocus: true,
    refreshInterval: 5000,
  });

  const handleQuantityChange = (e: any, actionIndex: number) => {
    let q: number = quantity;
    switch (actionIndex) {
      case -1:
        if (q > 1) setQuantity(--q);
        break;
      case +1:
        if (q < 10) {
          setQuantity(++q);
        }
        break;
      case 0:
        setQuantity(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleCheckOut = async() => {
    if (typeof id === "string") {
      const myStorage = window.localStorage;
      const campaignId: number = parseInt(id);
      const myCampaign = {
        campaignId,
        quantity,
      };
      await myStorage.setItem(LOCAL_STORAGE.CART_ITEM, JSON.stringify([myCampaign]));
      await cartApi.addToCart(myCampaign);
      await router.push(APP_PATH.CUSTOMER.CHECKOUT_2);
    }
  };

  const handleAddToCart = () => {
    const campaignId: number = parseInt(id as string);

    const myCampaign = {
      campaignId,
      quantity,
    };
    cartApi.addToCart(myCampaign);
  };

  function getDateObject(date: string): number {
    let myDate = new Date(date);
    let timezoneOffset = myDate.getTimezoneOffset() * 60 * 1000; //mins to milisec
    return Date.parse(date) - timezoneOffset;
  }

  const slideShowProps = {
    indicators: true,
    scale: 2,
  };

  const getCatePath = (catePath: string) => {
    const cateArr = catePath.split(";");
    console.log(cateArr);
    const formatReturn = (content: string) => {
      return (
        <>
          <span className="text-xl ml-5 mr-5">&gt;</span>
          <span className="text-xl">{content}</span>
        </>
      );
    };
    return (
      <>
        {cateArr
          .filter((cate) => cate.length > 0)
          .map((cate, index) => formatReturn(cate))}
      </>
    );
  };

  return (
    <div className="mx-auto w-1200">
      <div className="bg-white mt-10 p-4 max-h-full">
        <span className="text-xl text-blue-600">
          <Link href="/">Trang chủ</Link>
        </span>
        {data && getCatePath(data.data.catePath)}
      </div>
      <div className="bg-white mt-5 mx-auto max-h-full">
        <div className="flex flex-col align-center gap-5 justify-start p-4">
          <div className="grid grid-cols-12">
            <div className="col-start-1 col-span-4">
              {data && (
                <div className="slide-container mt-20">
                  <Slide {...slideShowProps}>
                    {data.data.images?.map((image, index) => (
                      <div className="each-slide" key={index}>
                        <InnerImageZoom src={image.url} zoomSrc={image.url} />
                      </div>
                    ))}
                  </Slide>
                </div>
              )}
            </div>
            <div className="col-span-8 col-start-6 mt-16">
              <span className="text-4xl font-bold">{data?.data.name}</span>
              <Divider variant="middle" className="pl-0 mt-3 mb-16" />
              <div className="w-full">
                {data?.data && (
                  <CustomStepper
                    milestones={getMergedMilestone(data.data)}
                    activeMilestone={getLastActiveMilestone(data.data)}
                    progress={data.data.currentSaleQuantity}
                    maxValue={getMaxMilestone(data.data)}
                  />
                )}
              </div>
              <div className="h-32 mt-16">
                <Button
                  onClick={(e) => handleQuantityChange(e, -1)}
                  variant="outlined"
                  style={{ fontSize: "30px" }}
                  className="h-16 w-16"
                >
                  -
                </Button>
                <TextField
                  onChange={(e) => handleQuantityChange(e, 0)}
                  value={quantity}
                  className="mx-5 h-16 w-16"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "inherit",
                    },
                  }}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: "center", fontSize: "20px" },
                    },
                  }}
                ></TextField>
                <Button
                  onClick={(e) => handleQuantityChange(e, +1)}
                  variant="outlined"
                  style={{ fontSize: "30px" }}
                  className="h-16 w-16"
                >
                  +
                </Button>
                <Button
                  onClick={handleCheckOut}
                  variant="outlined"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#ff0000",
                    color: "#FFFFFF",
                  }}
                  className="h-16 w-auto ml-16"
                >
                  Mua Hàng
                </Button>
                <Button
                  onClick={handleAddToCart}
                  variant="outlined"
                  style={{
                    fontSize: "20px",
                    backgroundColor: "#ff0000",
                    color: "#FFFFFF",
                  }}
                  className="h-16 w-auto ml-12"
                >
                  Thêm vào giỏ
                </Button>
              </div>
              {data && (
                <div className="flex justify-center">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold mb-5">
                      Thời gian còn lại:
                    </span>
                                    <Countdown date={getDateObject(data.data.endDate)} renderer={renderer}/>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white mt-5 mx-auto max-h-full">
                {data && <div className="flex flex-row p-5 gap-10">
                    <Avatar alt="shop avatar" src={data.data.shop?.avatarUrl} sx={{width: 100, height: 100}}/>
                    <div className="flex flex-col">
                        <div className="text-2xl">
                            {data.data.shop?.shopName}
                        </div>
                        <div>
                            {"{Sẽ thêm đánh giá ở đây sau}"}
                        </div>
                    </div>
                </div>}
            </div>
            {data && <div className="bg-white mt-5 mx-auto max-h-full p-5 mb-5">
                <div className="grid grid-rows-1">
                    <span className=" text-2xl font-bold mb-16">
                        Thông tin sản phẩm:
                    </span>
                </div>
                <div className="grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2">
                            <span className="font-bold text-xl">
                        Tên sản phẩm:
                    </span>
                        </div>
                        <div className="col-span-10">
                            <span className="text-xl">
                                {data.data.name}
                    </span>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" className="pl-0 mt-5 mb-5"/>
                <div className="grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2">
                            <span className="font-bold text-xl">
                        Xuất xứ:
                    </span>
                        </div>
                        <div className="col-span-10">
                            <span className="text-xl">
                                {data.data.origin}
                    </span>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" className="pl-0 mt-5 mb-5"/>
                <div className="grid grid-rows-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2">
                            <span className="font-bold text-xl">
                        Thương hiệu:
                    </span>
                        </div>
                        <div className="col-span-10">
                            <span className="text-xl">
                                {data.data.brand?.name}
                    </span>
                        </div>
                    </div>
                </div>
                <Divider variant="middle" className="pl-0 mt-5 mb-16"/>
                <span className=" text-2xl font-bold mb-10">
                        Mô tả sản phẩm:
                    </span>
                <ShowMoreText
                    lines={3}
                    more="Xem thêm"
                    less="Ẩn bớt"
                    className="content-css w-full text-xl mt-5"
                    anchorClass="my-anchor-css-class text-blue-600"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    {data.data.description}
                </ShowMoreText>
            </div>}
        </div>
    );
};

export default CampaignItem;
