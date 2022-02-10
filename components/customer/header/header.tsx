import { Popover } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

import React from "react";

interface HeaderProps {
  // welcome: boolean;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const router = useRouter();
  let welcome = true;
  return (
    <Popover
      className={classNames("w-full h-24 shadow-md z-30 fixed", {
        "bg-red-600": welcome,
        // relative: router.pathname === "/seller/registerInfo",
      })}
    >
      <div className=" mx-auto py-3 px-4 h-full sm:px-6">
        <div className="flex justify-between border-gray-100 h-full md:justify-start md:space-x-10">
          <div
            className={classNames(
              "flex justify-start items-center gap-10 lg:w-0 lg:flex-1 "
            )}
          >
            <Image src={"/Logo.svg"} width={50} height={70} />
          </div>

          <div className="md:flex h-20 items-start justify-end md:flex-1 lg:w-0">
            <div>
              <div
                className={classNames(
                  "md:flex items-center gap-2 text-white text-sm"
                )}
              >
                <Image width={15} height={15} src="/User.svg" />
                <span className="whitespace-nowrap font-normal">User123</span>
                <span className="whitespace-nowrap font-normal">|</span>
                <a
                  href="#"
                  className="whitespace-nowrap font-normal hover:text-gray-900"
                >
                  Đăng xuất
                </a>
              </div>
              <div className="text-white mt-3 flex">
                <Image width={30} height={30} src="/Shopping Cart.svg" />
                <span className="whitespace-nowrap font-normal my-auto">
                  Giỏ hàng
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default Header;
