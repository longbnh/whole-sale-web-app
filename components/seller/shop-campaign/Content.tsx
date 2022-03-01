import React, {useState} from "react";
import {Avatar, Button, IconButton, Input, List, ListItem, MenuItem, Pagination, Select} from "@mui/material";
import {ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronRightIcon, SearchIcon} from "@heroicons/react/solid";
import Stack from "@mui/material/Stack";
import useSWR from "swr";
import shopApi from "../../../api/shopApi";
import {APP_PATH, PAGE_REQUEST} from "../../../shared/enum/enum";
import {IRequestPage, IRequestPageInitialState} from "../../../shared/models/IRequestPage";
import {useRouter} from "next/router";
import {getCurrentPrice} from "../../../utils/CampaignUtils";
import {
    handleOrderUtil,
    handlePageUtil,
    handleSortUtil,
    handleStatusUtil,
    matchOrderType,
    matchSortType
} from "../../../utils/PageRequestUtils";
import {CampaignDisplayStatus, SortType, StatusQueryType} from "../../../shared/type/type";
import GENERAL_ORDER = PAGE_REQUEST.ORDER.ORDER_QUERY;
import CAMPAIGN_QUERY = PAGE_REQUEST.STATUS.CAMPAIGN.CAMPAIGN_QUERY;
import CAMPAIGN_DISPLAY = PAGE_REQUEST.STATUS.CAMPAIGN.CAMPAIGN_DISPLAY;
import ORDER_QUERY = PAGE_REQUEST.ORDER.ORDER_QUERY;
import CAMPAIGN = PAGE_REQUEST.SORT.CAMPAIGN;


interface ICampaignStatus {
    id: StatusQueryType;
    name: string;
}

const campaignStatuses: ICampaignStatus[] = [
    {
        id: CAMPAIGN_QUERY.NO_SEARCH,
        name: "Tất cả"
    },
    {
        id: CAMPAIGN_QUERY.ACTIVE,
        name: "Đang bán"
    },
    {
        id: CAMPAIGN_QUERY.HIDDEN,
        name: "Đã ẩn"
    },
    {
        id: CAMPAIGN_QUERY.COMPLETE,
        name: "Hoàn thành"
    }
]
const Content = () => {
    const [campaignName, setCampaignName] = useState<string>("");
    let initialState:IRequestPage = {...IRequestPageInitialState, sort: PAGE_REQUEST.SORT.CAMPAIGN.DEFAULT}
    const [pageRequest, setPageRequest] = useState<IRequestPage>(initialState);
    const router = useRouter();
    const {data} = useSWR([
        1,
        campaignName,
        pageRequest
    ], shopApi.getCampaigns, {
        revalidateOnFocus: true
    });

    const handleSearch = (e: any) => {
        let searchValue = e.target.value;
        handlePageUtil(1, setPageRequest);
        setCampaignName(searchValue);
    }

    function renderStatus(status: CampaignDisplayStatus) {
        switch (status) {
            case CAMPAIGN_DISPLAY.ACTIVE:
                return (
                    <span className="font-bold text-green-500">ĐANG BÁN</span>
                )
            case CAMPAIGN_DISPLAY.HIDDEN:
                return (
                    <span className="font-bold text-red-500">ĐÃ ẨN</span>
                )
            case CAMPAIGN_DISPLAY.COMPLETE:
                return (
                    <span className="font-bold text-blue-500">HOÀN THÀNH</span>
                )
        }
    }

    function sortDisplayColor(sort: SortType, matching: SortType) {

    }

    return (
        <div
            className="w-full relative bg-gray-100 ml-56"
        >
            <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div className="flex bg-white mx-4 mt-5 max-h-full border rounded-xl px-5 py-2 items-center justify-start gap-5">
                    <span className="text-xl">Sắp xếp theo:</span>
                    <Button className={`${matchSortType(pageRequest.sort, CAMPAIGN.NAME)
                        ? "bg-red-600 text-white hover:bg-red-500 hover:text-gray"
                        : "bg-white"}`}
                            onClick={() => handleSortUtil(CAMPAIGN.NAME, setPageRequest)}
                    >
                        Tên sản phẩm
                    </Button>
                    <Button className={`${matchSortType(pageRequest.sort, CAMPAIGN.REVENUE)
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black"
                        : "bg-white"}`}
                            onClick={() => handleSortUtil(CAMPAIGN.REVENUE, setPageRequest)}
                    >
                        Doanh số
                    </Button>
                    <Button className={`${matchSortType(pageRequest.sort, CAMPAIGN.END_DATE)
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black"
                        : "bg-white"}`}
                            onClick={() => handleSortUtil(CAMPAIGN.END_DATE, setPageRequest)}
                    >
                        Thời gian kết thúc
                    </Button>
                    <span className="flex items-center gap-5 text-xl ml-auto">
                        Thứ tự:
                        <IconButton aria-label="up"
                                    size="small"
                                    onClick={() => handleOrderUtil(GENERAL_ORDER.ASC, setPageRequest)}
                                    disabled={matchSortType(pageRequest.sort, CAMPAIGN.DEFAULT)}>
                        <ArrowCircleUpIcon className={`h-10 w-10 
                        ${matchOrderType(pageRequest.order, ORDER_QUERY.ASC)
                        && !matchSortType(pageRequest.sort, CAMPAIGN.DEFAULT)
                            ? "text-green-500" 
                            : "text-gray-500"}`}/>
                        </IconButton>

                        <IconButton aria-label="down"
                                    size="small"
                                    onClick={() => handleOrderUtil(GENERAL_ORDER.DESC, setPageRequest)}
                                    disabled={matchSortType(pageRequest.sort, CAMPAIGN.DEFAULT)}>
                        <ArrowCircleDownIcon className={`h-10 w-10 
                        ${matchOrderType(pageRequest.order, ORDER_QUERY.DESC)
                        && !matchSortType(pageRequest.sort, CAMPAIGN.DEFAULT)
                            ? "text-red-500" 
                            : "text-gray-500"}`}/>
                        </IconButton>
                    </span>
                </div>
            </div>
            <div className="mx-4 mt-5 overflow-y-auto overflow-x-hidden max-h-full">
                <div className="flex mx-4 max-h-full items-center gap-5">
                    <div className="flex items-center bg-white w-full h-16 p-5 relative border rounded-2xl">
                        <div className="w-5/6">
                            <Input fullWidth
                                   onChange={handleSearch}
                                   placeholder="Tìm kiếm theo tên hàng..."
                                   disableUnderline/>
                        </div>
                        <SearchIcon className="w-5 h-5 absolute right-5"/>
                    </div>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        displayEmpty
                        value={pageRequest.status}
                        className="bg-white ml-auto h-16 border rounded-2xl w-2/6"
                        inputProps={{'aria-label': 'Without label'}}
                        onChange={(e) => handleStatusUtil((e.target.value as StatusQueryType), setPageRequest)}
                    >
                        <MenuItem disabled value={undefined}>
                            <em>Lọc trạng thái</em>
                        </MenuItem>
                        {campaignStatuses.map(campaignStatus =>
                            <MenuItem value={campaignStatus.id} key={campaignStatus.id}>
                                {campaignStatus.name}
                            </MenuItem>)}
                    </Select>
                </div>
            </div>
            {data && <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div className="bg-white mx-4 mt-5 overflow-y-auto p-2 overflow-x-hidden min-h-screen border rounded-xl">
                    <List className="h-auto">
                        {data.data.content.map((campaign) => (
                            <ListItem button
                                      onClick={() => router.push(`${APP_PATH.SELLER.CAMPAIGN}/${campaign.id}`)}
                                      key={campaign.id}
                                      divider
                                      className="my-5 p-5 relative flex gap-16">
                                <Avatar sx={{width: 100, height: 100}} variant="square">
                                    <img src={campaign.imageUrl}/>
                                </Avatar>
                                <div className="grid grid-cols-1">
                                    <div className="font-bold text-2xl">
                                        {campaign.name}
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-3">
                                        <div>
                                            Doanh thu:
                                        </div>
                                        <div
                                            // className="ml-auto"
                                        >
                                            {(getCurrentPrice(campaign) * campaign.currentSaleQuantity).toLocaleString()}đ
                                        </div>
                                        <div>
                                            Ngày kết thúc:
                                        </div>
                                        <div>
                                            {new Date(Date.parse(campaign.endDate)).toLocaleDateString('vi-VI', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div>
                                            Trạng thái:
                                        </div>
                                        <div>
                                            {renderStatus(campaign.status)}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRightIcon className="absolute right-0" style={{
                                    top: "50%",
                                    height: "20",
                                }}/>
                            </ListItem>
                        ))}
                    </List>
                    {data.data.content.length > 0 && <div className="flex justify-end mt-16">
                        <Stack spacing={2}>
                            <Pagination count={data?.data?.totalPage}
                                        page={pageRequest.page}
                                        onChange={(e, page) => handlePageUtil(page,  setPageRequest)}
                                        variant="outlined"
                                        shape="rounded"/>
                        </Stack>
                    </div>}
                    {!(data.data.content.length > 0) && <div className="flex justify-center text-xl mt-16">Không tìm thấy kết quả phù hợp!</div>}
                </div>
            </div>}
        </div>
    );
};
export default Content;
