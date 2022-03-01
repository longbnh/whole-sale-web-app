import {Dispatch, SetStateAction} from "react";
import {IRequestPage} from "../shared/models/IRequestPage";
import {CampaignDisplayStatus, OrderType, SortType, StatusQueryType} from "../shared/type/type";
import {PAGE_REQUEST} from "../shared/enum/enum";
import ORDER_QUERY = PAGE_REQUEST.ORDER.ORDER_QUERY;

export const handlePageUtil = (pageIndex: number, setPageRequest: Dispatch<SetStateAction<IRequestPage>>) => {
    setPageRequest(prevState => ({...prevState, page: pageIndex}))
}
export const handlePageSizeUtil = (pageSize: number, setPageRequest: Dispatch<SetStateAction<IRequestPage>>) => {
    setPageRequest(prevState => ({...prevState, pageSize: pageSize}))
}
export const handleSortUtil = (sortType: SortType, setPageRequest: Dispatch<SetStateAction<IRequestPage>>) => {
    setPageRequest(prevState => ({
        ...prevState,
        sort: sortType,
        page: 1,
        order: ORDER_QUERY.ASC
    }))
}
export const handleOrderUtil = (orderType: OrderType, setPageRequest: Dispatch<SetStateAction<IRequestPage>>) => {
    setPageRequest(prevState => ({...prevState, order: orderType}))
}

export const handleStatusUtil = (statusType: StatusQueryType, setPageRequest: Dispatch<SetStateAction<IRequestPage>>) => {
    setPageRequest(prevState => ({
        ...prevState,
        status: statusType,
        page: 1,
    }))
}

export function matchSortType(original: SortType | undefined, comparedValue: SortType): boolean {
    if (original === undefined) {
        return false;
    }
    return original === comparedValue;
}

export function matchOrderType(original: OrderType | undefined, comparedValue: OrderType): boolean {
    if (original === undefined) {
        return false;
    }
    return original === comparedValue;
}

export function matchStatusQueryType(original: StatusQueryType | undefined, comparedValue: StatusQueryType): boolean {
    if (original === undefined) {
        return false;
    }
    return original === comparedValue;
}

export function matchCampaignStatusDisplayType(original: CampaignDisplayStatus, comparedValue: CampaignDisplayStatus): boolean {
    return original === comparedValue;
}