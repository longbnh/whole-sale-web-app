import React from "react";
import {useRouter} from "next/router";
import CampaignItem from "../campaign/CampaignItem";
import Link from "next/link";

const Content = () => {
    const router = useRouter();
    // const orderId = router.query.id;
    return (
        <div
            className="w-full relative bg-gray-100 h-full"
        >
            <div className="bg-white mt-24 mx-auto w-4/5 max-h-full">
                <span>{"{Address here}"}</span>
            </div>
            <div className="bg-white mt-5 mx-auto w-4/5 min-h-screen">
                <span>{"{Order here}"}</span>
            </div>
            <div className="bg-white mt-5 mx-auto w-4/5 min-h-screen">
                <span>{"{Payment here}"}</span>
            </div>
        </div>
    );
};

export default Content;
