import {ICampaign} from "../shared/models/ICampaign";
import {IMilestone} from "../shared/models/IMilestone";

export function getMergedMilestone(campaign: ICampaign): IMilestone[] {
    return campaign.mileStones.sort(function (a, b) {
        return a.requiredSaleQuantity - b.requiredSaleQuantity;
    });
}

export function getLastActiveMilestone(campaign: ICampaign): number {
    const mergedMilestone = getMergedMilestone(campaign);
    const milestoneQuantity = mergedMilestone.map(milestone => milestone.requiredSaleQuantity);
    const arrayOfActiveMilestone = milestoneQuantity
        .filter(quantity => quantity <= campaign.currentSaleQuantity);
    const largestActiveMilestone = Math.max.apply(Math, arrayOfActiveMilestone);
    return milestoneQuantity.indexOf(largestActiveMilestone);
}

export function getMaxMilestone(campaign: ICampaign): number {
    const mergedMilestone = getMergedMilestone(campaign);
    const sortedMilestonesQuantity = mergedMilestone.map(milestone => milestone.requiredSaleQuantity).sort();
    return Math.max.apply(Math, sortedMilestonesQuantity);
}

export function getCurrentPrice(campaign: ICampaign): number {
    console.log(campaign)
    return getMergedMilestone(campaign)[getLastActiveMilestone(campaign)].price
}

export function getPercentageSaleOff(campaign: ICampaign, currentPrice: number) {
    console.log(currentPrice)
    console.log(getMergedMilestone(campaign)[0].price)
    return (100 - (currentPrice / getMergedMilestone(campaign)[0].price * 100)).toFixed(2);
}