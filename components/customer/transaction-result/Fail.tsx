import Cancel from "@mui/icons-material/Cancel";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

const Fail = () => {
    const router = useRouter();
    return (
        <>
            <div className="my-20">
                <Cancel className="h-56 w-56 text-red-500"/>
            </div>
            <div className="text-xl">
                <span>Thanh toán </span>
                <span className="text-red-500 font-bold">thất bại</span>
            </div>
            <div className="flex gap-x-56 my-16">
                <Button className="w-56 bg-red-500 hover:bg-red-400"
                        onClick={() => router.replace("/")}
                        variant="contained">
                    Trang chủ
                </Button>
            </div>
        </>
    )
}

export default Fail;