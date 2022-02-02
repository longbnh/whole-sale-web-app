import {Popover} from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import {useRouter} from "next/router";

import React from "react";

interface HeaderProps {
    // welcome: boolean;
}

const Header: React.FC<HeaderProps> = ({}) => {
    const router = useRouter();
    let welcome = false;
    return (
        <Popover
            className={classNames("w-full h-14 shadow-md z-30 bg-white fixed", {
                "bg-red-600": welcome,
                "top-0 sticky": router.pathname !== "/seller/registerInfo",
                // relative: router.pathname === "/seller/registerInfo",
            })}
        >
            <div className=" mx-auto px-4 sm:px-6">
                <div className="flex justify-between border-gray-100 md:justify-start md:space-x-10">
                    <div
                        className={classNames(
                            "flex justify-start items-center gap-10 lg:w-0 lg:flex-1",
                            {"py-6": welcome}
                        )}
                    >
                        <span className="sr-only">Workflow</span>
                        <Image
                            src={welcome ? "/Logo.svg" : "/LogoRed.svg"}
                            width={50}
                            height={50}
                        />

                        <span
                            className={classNames("font-bold  ", {
                                "text-2xl text-white": welcome,
                                "text-xl": !welcome,
                            })}
                        >
              Kênh Bán Hàng
            </span>
                    </div>

                    <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                        <div
                            className={classNames("md:flex items-center gap-2 ", {
                                "text-white": welcome,
                            })}
                        >
                            <Image width={5} height={5} src="/User.svg"/>
                            <span className="whitespace-nowrap font-medium">User123</span>
                            <span className="whitespace-nowrap font-medium">|</span>
                            <a
                                href="#"
                                className="whitespace-nowrap font-medium hover:text-gray-900"
                            >
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    );
};

export default Header;
