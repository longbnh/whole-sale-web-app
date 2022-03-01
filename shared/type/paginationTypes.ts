import {PAGE_REQUEST} from "../enum/enum";


/**
 * Status type
 */
const status = PAGE_REQUEST.STATUS;
//For campaign
const campaignStatus = status.CAMPAIGN;
export type CampaignDisplayStatus = typeof campaignStatus.CAMPAIGN_DISPLAY.COMPLETE
    | typeof campaignStatus.CAMPAIGN_DISPLAY.ACTIVE
    | typeof campaignStatus.CAMPAIGN_DISPLAY.HIDDEN

type CampaignQueryStatus = typeof campaignStatus.CAMPAIGN_QUERY.COMPLETE
    | typeof campaignStatus.CAMPAIGN_QUERY.NO_SEARCH
    | typeof campaignStatus.CAMPAIGN_QUERY.ACTIVE
    | typeof campaignStatus.CAMPAIGN_QUERY.HIDDEN

//For product
const productStatus = status.PRODUCT;
export type ProductDisplayStatus = typeof productStatus.PRODUCT_DISPLAY.ACTIVE
    | typeof productStatus.PRODUCT_DISPLAY.DELETED
    | typeof productStatus.PRODUCT_DISPLAY.ON_SALE

type ProductQueryStatus = typeof productStatus.PRODUCT_QUERY.GET_ALL_ACTIVE_AND_SALE
    | typeof productStatus.PRODUCT_QUERY.GET_ALL_ACTIVE_ONLY
    | typeof productStatus.PRODUCT_QUERY.GET_ALL_SALE_ONLY

export type StatusQueryType = CampaignQueryStatus | ProductQueryStatus;

/**
 * Order type
 */
const order = PAGE_REQUEST.ORDER;
export type OrderType = typeof order.ORDER_QUERY.ASC | typeof order.ORDER_QUERY.DESC;

/**
 * Sort type
 */
const sort = PAGE_REQUEST.SORT;
//For campaign
const campaignSort = sort.CAMPAIGN;
type CampaignSort = typeof campaignSort.NAME
    | typeof campaignSort.DEFAULT
    | typeof campaignSort.END_DATE
    | typeof campaignSort.REVENUE

//For product
const productSort = sort.PRODUCT;
type ProductSort = typeof productSort.BY_CREATE_DATE
    | typeof productSort.BY_ID
    | typeof productSort.BY_NAME
    | typeof productSort.NO_SEARCH

export type SortType = CampaignSort | ProductSort;