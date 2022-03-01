import {OrderType, SortType, StatusQueryType} from "../type/type";

export interface IRequestPage {
    page: number;
    pageSize: number;
    sort?: SortType;
    order?: OrderType;
    status?: StatusQueryType;
}

export const IRequestPageInitialState: IRequestPage = {
    page: 1,
    pageSize: 5,
}

