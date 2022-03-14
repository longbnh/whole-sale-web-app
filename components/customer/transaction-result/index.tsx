import React, {useEffect, useState} from "react";
import Content from "./Content";
import {useRouter} from "next/router";
import {Backdrop, CircularProgress} from "@mui/material";

const Result = () => {
    const router = useRouter();
    const [valid, setValid] = useState<boolean>(false);
    const {query} = router;
    const {vnp_TransactionStatus, vnp_Amount} = query

    useEffect(() => {
        if (router.isReady && (!vnp_TransactionStatus || isNaN(parseInt(vnp_Amount as string)))) {
            router.push("/");
        }
        else {
            if (router.isReady) {
                setValid(true);
            }
        }

    }, [query, router, vnp_TransactionStatus, vnp_Amount])
    if (valid) {
        return <Content vnp_Amount={parseInt(vnp_Amount as string)}
                        vnp_TransactionStatus={vnp_TransactionStatus as string}/>;
    }

    return (
        <div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={true}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    )
};

export default Result;
