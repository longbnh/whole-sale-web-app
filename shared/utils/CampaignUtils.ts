import {ICampaign} from "../models/ICampaign";
import {IMilestone} from "../models/IMilestone";

export function getMergedMilestone(campaign: ICampaign): IMilestone[] {
    // const originalValue = [{
    //     price: campaign.basicInfo.originalPrice,
    //     quantity: 0,
    // }]
    // return originalValue.concat(campaign.milestones);
    return campaign.mileStones.sort(function (a, b) {
        return a.requiredSaleQuantity - b.requiredSaleQuantity;
    });
}

export function getLastActiveMilestone(campaign: ICampaign): number {
    // console.log(campaign)
    const mergedMilestone = getMergedMilestone(campaign);
    // console.log(mergedMilestone)
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
    return getMergedMilestone(campaign)[getLastActiveMilestone(campaign)].price
}