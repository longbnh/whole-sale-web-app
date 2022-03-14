import React from "react";
import { useRouter } from "next/router";
import { Avatar } from "@mui/material";
import Image from "next/image";
import classNames from "classnames";
import { APP_PATH } from "../../../shared/enum/enum";

const Sidebar = () => {
  const route = useRouter();

  return (
    <div
      className="px-2 flex flex-col sticky flex-start top-0 bg-white w-72 rounded-lg"
      style={{ height: "calc(100vh - 20px)" }}
    >
      <div className="mt-5 ml-5 flex text-lg font-medium">
        <Avatar className="bg-slate-300">U</Avatar>
        <div className="ml-3">User123</div>
      </div>
      <div className="flex mt-10 ml-5">
        <Image width={25} height={25} src="/User.svg" layout="fixed" />
        <div className="ml-2">Tài khoản của tôi</div>
      </div>
      <div
        className={classNames("flex mt-5 ml-5", {
          "text-red-500": route.asPath === APP_PATH.CUSTOMER.PURCHASE,
        })}
      >
        <Image width={25} height={25} src="/Order.svg" layout="fixed" />
        <div className="ml-2">Đơn hàng</div>
      </div>
    </div>
  );
};

export default Sidebar;
