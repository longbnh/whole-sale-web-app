import Link from "next/link";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "../../utils/CustomButton";
import React from "react";
import { ExclamationCircleIcon } from '@heroicons/react/solid'
import BasicModal from "../../utils/BasicModal";
import AddressModal from "./AddressModal";


const Content = () => {

    return (
        <div className="flex flex-col items-center relative min-h-screen bg-gray-100">
            <div className="bg-white flex w-11/12 mt-5 h-16 pl-5 pr-5">
                <Link href="/seller/welcome">
                    <a className="text-blue-500 justify-start items-center flex">
                        Quay lại
                    </a>
                </Link>
            </div>
            <div className="bg-white flex w-11/12 mt-5 h-16 pl-10 pr-10">
                <h1 className="font-bold text-2xl flex items-center">
                    Tạo Thông Tin Cửa Hàng
                </h1>
            </div>
            <div className="bg-white flex flex-col w-11/12 mt-5 h-16 p-10 h-auto gap-10">
                <div className="flex flex-row">
                    <div className="flex items-center w-1/4">
                        <span className="flex required">Tên cửa hàng</span>
                    </div>
                    <div className="flex items-center">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '25vw'},
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <OutlinedInput placeholder="Nhập tên cửa hàng"/>
                        </Box>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex items-center w-1/4">
                        <span className="flex">Giới thiệu cửa hàng</span>
                    </div>
                    <div className="flex items-center">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '50vw'},
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <OutlinedInput placeholder="Nhập giới thiệu" multiline rows={3}/>
                        </Box>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex items-center w-1/4">
                        <span className="flex required">Cài đặt vận chuyển</span>
                    </div>
                    <div className="flex items-center">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <BasicModal btName="Tùy chọn" childComp={<AddressModal/>}/>
                        </Box>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex items-center w-1/4">
                        <span className="flex required">Ngành hàng</span>
                    </div>
                    <div className="flex items-center">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >

                            <Button content="Tùy chọn" size="small" color="#FFFFFF"/>
                        </Box>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 mt-5">
                    <ExclamationCircleIcon className="h-5 w-5" style={{color: "#FF0000"}}/>
                    <span className="text-xl" style={{color: "#FF0000"}}>
                        Lưu ý: Hồ sơ của cửa hàng sẽ không được duyệt nếu bạn không xác minh thông tin!
                    </span>
                </div>
                <div className="flex flex-row-reverse gap-5">
                    <Button content="Đặt lại" size="small" color="#FFFFFF" />
                    <Button content="Lưu" size="small"/>
                </div>
            </div>

        </div>
    )
}

export default Content;