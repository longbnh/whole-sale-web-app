import Image from "next/image";
import React from "react";
import Button from "../../utils/CustomButton";

const Content = () => {
  return (
    <div className=" w-full h-screen bg-gray-100">
      <div className=" w-5/6 mx-auto bg-white">
        <div className="flex justify-center">
          <Image src={"/Welcome.svg"} width={500} height={500} />
        </div>
        <div className="flex justify-center">
          <h3 className="text-base">Bắt đầu bán hàng qua XATAJP</h3>
        </div>
        <div className="flex justify-center py-7">
          <Button content="Tạo cửa hàng" size="large" />
        </div>
      </div>
    </div>
  );
};

export default Content;
// bg-gray-100
