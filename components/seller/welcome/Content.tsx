import Image from "next/image";
import React from "react";

import Button from "../../commons/CustomButton";
import { useRouter } from "next/router";

const Content = () => {
  const router = useRouter();
  return (
    <div className=" w-full h-screen bg-gray-100 pt-4">
      <div className=" w-5/6 mx-auto bg-white ">
        <div className="flex justify-center">
          <Image src={"/Welcome.svg"} width={500} height={500} />
        </div>
        <div className="flex justify-center">
          <h3 className="text-base">Bắt đầu bán hàng qua XATAJP</h3>
        </div>
        <div className="flex justify-center py-7">
          <Button
            content="Tạo cửa hàng"
            size="large"
            onClick={() => router.push("/seller/registerInfo")}
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
