import React, {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Success from "./Success";
import Fail from "./Fail";


const SUCCESS = "00";

export interface IPaymentResponse {
    vnp_TransactionStatus?: string;
    vnp_Amount: number;
}

const Content:FC<IPaymentResponse> = (props) => {
    const [response, setResponse] = useState<IPaymentResponse | undefined>(undefined);
    const router = useRouter();
    const {vnp_TransactionStatus, vnp_Amount} = props;
    const {query} = router;

    useEffect(() => {

        setResponse({
            vnp_Amount: vnp_Amount / 100,
            vnp_TransactionStatus: vnp_TransactionStatus as string,
        });
    }, [])
    function getResult() {
        console.log(response)
        if (response && response.vnp_TransactionStatus === SUCCESS) {
            return <Success vnp_Amount={response.vnp_Amount}/>
        }
        if (response && response.vnp_TransactionStatus !== SUCCESS) {
            return <Fail/>
        }

    }

    return (
        <div className="bg-white w-1200 mx-auto mt-5 h-all-but-header p-5 rounded-2xl">
            <div className="flex flex-col items-center">
                <div className="text-3xl">
                    Kết quả thanh toán
                </div>
                {getResult()}
            </div>
        </div>
    )
}

export default Content;