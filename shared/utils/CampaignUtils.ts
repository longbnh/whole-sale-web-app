import {ICampaign} from "../models/ICampaign";
import {IMilestone} from "../models/IMilestone";

export function getMergedMilestone(campaign: ICampaign): IMilestone[] {
    // const originalValue = [{
    //     price: campaign.basicInfo.originalPrice,
    //     quantity: 0,
    // }]
    // return originalValue.concat(campaign.milestones);
    console.log(campaign)
    return campaign.mileStones;
}

export function getLastActiveMilestone(campaign: ICampaign): number {
    // console.log(campaign)
    const mergedMilestone = getMergedMilestone(campaign);
    // console.log(mergedMilestone)
    const sortedMilestonesQuantity = mergedMilestone.map(milestone => milestone.requiredSaleQuantity).sort();
    const arrayOfActiveMilestone = sortedMilestonesQuantity
        .filter(quantity => quantity <= campaign.currentSaleQuantity);
    const largestActiveMilestone = Math.max.apply(Math, arrayOfActiveMilestone);
    return sortedMilestonesQuantity.indexOf(largestActiveMilestone);
}

export function getMaxMilestone(campaign: ICampaign): number {
    const mergedMilestone = getMergedMilestone(campaign);
    const sortedMilestonesQuantity = mergedMilestone.map(milestone => milestone.requiredSaleQuantity).sort();
    return Math.max.apply(Math, sortedMilestonesQuantity);
}