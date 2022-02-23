import {ICampaign} from "../models/ICampaign";
import {IMilestone} from "../models/IMilestone";
import {ICampaignItem} from "../models/ICampaignItem";

export function getMergedMilestone(campaign: ICampaign): IMilestone[] {
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

export function getPercentageSaleOff(campaign: ICampaign, currentPrice: number): number {
    console.log(currentPrice)
    console.log(getMergedMilestone(campaign)[0].price)
    return 100 - (currentPrice / getMergedMilestone(campaign)[0].price * 100);
}

/**
 * getMergedMilestone2 functions as well as getMergedMilestone but receives ICampaignItem instead of ICampaign
 */
export function getMergedMilestone2(campaign: ICampaignItem): IMilestone[] {
    return campaign.mileStones.sort(function (a, b) {
        return a.requiredSaleQuantity - b.requiredSaleQuantity;
    });
}

/**
 * getLastActiveMilestone2 functions as well as getLastActiveMilestone but receives ICampaignItem instead of ICampaign
 */
export function getLastActiveMilestone2(campaign: ICampaignItem): number {
    const mergedMilestone = getMergedMilestone2(campaign);
    const milestoneQuantity = mergedMilestone.map(milestone => milestone.requiredSaleQuantity);
    const arrayOfActiveMilestone = milestoneQuantity
        .filter(quantity => quantity <= campaign.currentSaleQuantity);
    const largestActiveMilestone = Math.max.apply(Math, arrayOfActiveMilestone);
    return milestoneQuantity.indexOf(largestActiveMilestone);
}

/**
 * getMaxMilestone2 functions as well as getMaxMilestone but receives ICampaignItem instead of ICampaign
 */
export function getMaxMilestone2(campaign: ICampaignItem): number {
    const mergedMilestone = getMergedMilestone2(campaign);
    const sortedMilestonesQuantity = mergedMilestone.map(milestone => milestone.requiredSaleQuantity).sort();
    return Math.max.apply(Math, sortedMilestonesQuantity);
}

/**
 * getCurrentPrice2 functions as well as getCurrentPrice but receives ICampaignItem instead of ICampaign
 */
export function getCurrentPrice2(campaign: ICampaignItem): number {
    return getMergedMilestone2(campaign)[getLastActiveMilestone2(campaign)].price
}