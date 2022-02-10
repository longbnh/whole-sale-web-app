import React from "react";
import {ICampaign} from "../../../shared/models/ICampaign";
import CustomStepper from "../../commons/CustomStepper";

const Content = () => {

    const campaign: ICampaign = {
        id: 1,
        startDate: '10/2/2022',
        endDate: '20/2/2022',
        currentSale: 32,
        inStockQuantity: 100,
        promotionPlanId: 0,
        status: 0,
        basicInfo: {
            id: "1",
            originalPrice: 50000,
            description: "abcdef",
            name: "Dien thoai",
        },
        milestones: [
            {
                price: 48000,
                quantity: 20
            },
            {
                price: 45000,
                quantity: 40
            },
            {
                price: 42000,
                quantity: 60
            },
            {
                price: 40000,
                quantity: 80
            },
        ]
    }
    const originalValue = [{
        price: campaign.basicInfo.originalPrice,
        quantity: 0,
    }]
    const mergedMilestone = originalValue.concat(campaign.milestones);

    function getLastActiveMilestone(campaign: ICampaign): number {

        const sortedMilestonesQuantity = mergedMilestone.map(milestone => milestone.quantity).sort();
        const arrayOfActiveMilestone = sortedMilestonesQuantity
            .filter(quantity => quantity <= campaign.currentSale);
        const largestActiveMilestone = Math.max.apply(Math, arrayOfActiveMilestone);
        return sortedMilestonesQuantity.indexOf(largestActiveMilestone);
    }

    function getMaxMilestone() : number {
        const sortedMilestonesQuantity = mergedMilestone.map(milestone => milestone.quantity).sort();
        return Math.max.apply(Math, sortedMilestonesQuantity);
    }


    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56"
        >
            <div className="bg-white mx-4 w-full overflow-y-auto overflow-x-hidden min-h-screen">
                <div className="flex flex-col w-5/6">
                    {campaign.basicInfo?.name}
                    <CustomStepper
                        milestones={mergedMilestone}
                        activeMilestone={getLastActiveMilestone(campaign)}
                        progress={campaign.currentSale}
                        maxValue={getMaxMilestone()}
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;
