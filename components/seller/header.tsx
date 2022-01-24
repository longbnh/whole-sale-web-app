import {Popover} from '@headlessui/react'
import {NextPage} from "next";

const Header: NextPage = () => {
    return (
        <Popover className="relative bg-red-600">
            <div className=" mx-auto px-4 sm:px-6">
                <div className="flex justify-between border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start items-center gap-10 lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img
                                className="h-10 w-auto sm:h-10"
                                src="/Logo.svg"
                                alt="Logo"
                            />
                        </a>
                        <span className="text-base font-bold text-2xl text-white">
                            Kênh Bán Hàng
                        </span>
                    </div>

                    <div className="md:flex items-start justify-end md:flex-1 lg:w-0">
                        <div className="md:flex items-center gap-2 text-white">
                            <img
                                className="w-auto md:h-6 sm:h-4"
                                src="/User.svg"
                                alt="Logo"
                            />
                            <span className="whitespace-nowrap font-medium">
                            User123
                        </span>
                            <span className="whitespace-nowrap font-medium">
                            |
                        </span>
                            <a href="#"
                               className="whitespace-nowrap font-medium hover:text-gray-900">
                                Đăng xuất
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Popover>
    )
};

export default Header;