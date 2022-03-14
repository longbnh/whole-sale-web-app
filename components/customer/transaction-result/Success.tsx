import {FC} from "react";
import {IPaymentResponse} from "./Content";
import NumberFormat from "../../../utils/NumberFormat";
import CheckCircle from "@mui/icons-material/CheckCircle";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

const Success: FC<IPaymentResponse> = (props) => {
    const router = useRouter();
    const {vnp_Amount} = props;
    return (
        <>
            <div className="my-20">
                <CheckCircle className="h-56 w-56 text-green-500"/>
            </div>
            <div className="text-xl">
                <span>Bạn đã thanh toán </span>
                <span className="text-green-500 font-bold">thành công</span>
            </div>
            <div className="text-xl">
                <span>Số tiền là </span>
                <span className="text-green-500 font-bold">{NumberFormat(vnp_Amount)}</span>
                <span>đ</span>
            </div>
            <div className="flex gap-x-56 my-16">
                <Button className="w-56 bg-green-500 hover:bg-green-400"
                        onClick={() => router.replace("/")}
                        variant="contained">
                    Trang chủ
                </Button>
                <Button className="w-56 bg-blue-500 hover:bg-blue-400" variant="contained">
                    Xem hóa đơn
                </Button>
            </div>
        </>
    )
}

export default Success;