import React from "react";
import {useRouter} from "next/router";
import CampaignItem from "./CampaignItem";

const Content = () => {
    const router = useRouter();
    const campaignId = router.query.id;
    return (
        <div
            className="w-full relative flex bg-gray-100"
        >

            <CampaignItem id={campaignId}/>
        </div>
    );
};

export default Content;
