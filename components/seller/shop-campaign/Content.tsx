import React, {useState} from "react";
import {Avatar, Button, IconButton, Input, List, ListItem, MenuItem, Pagination, Select} from "@mui/material";
import {ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronRightIcon, SearchIcon} from "@heroicons/react/solid";
import Stack from "@mui/material/Stack";
import useSWR from "swr";
import shopApi from "../../../api/shopApi";
import {
    CAMPAIGN_DISPLAY_STATUS,
    CAMPAIGN_SORT_DIRECTION,
    CAMPAIGN_SORT_TYPE,
    CAMPAIGN_STATUS
} from "../../../shared/enum/enum";
import {getCurrentPrice2} from "../../../shared/utils/CampaignUtils";
import {IRequestPageAlter} from "../../../shared/models/IRequestPage";
import {useRouter} from "next/router";


interface ICampaignStatus {
    id: number;
    name: string;
}

const campaignStatuses: ICampaignStatus[] = [
    {
        id: CAMPAIGN_STATUS.NO_SEARCH,
        name: "Tất cả"
    },
    {
        id: CAMPAIGN_STATUS.ACTIVE,
        name: "Đang bán"
    },
    {
        id: CAMPAIGN_STATUS.HIDDEN,
        name: "Đã ẩn"
    },
    {
        id: CAMPAIGN_STATUS.COMPLETE,
        name: "Hoàn thành"
    }
]
const Content = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [productName, setProductName] = useState<string>("");
    const [sortBy, setSortBy] = useState<number>(CAMPAIGN_SORT_TYPE.DEFAULT);
    const [status, setStatus] = useState<number>(CAMPAIGN_STATUS.NO_SEARCH);
    const [sortDirection, setSortDirection] = useState<number>(CAMPAIGN_SORT_DIRECTION.ASC);

    const router = useRouter();
    let pageParam : IRequestPageAlter = {
        Page: page,
        PageSize: pageSize,
        Sort: sortBy,
    }
    const {data, error} = useSWR([
        1,
        productName,
        status,
        sortDirection,
        pageParam
    ], shopApi.getCampaigns, {
        revalidateOnFocus: true
    });

    const handlePaging = (e: any, page: number) => {
        setPage(page)
    }

    const handleStatusChange = (e: any) => {
        let newStatus = e.target.value;
        setStatus(newStatus);
    }

    const handleSortOrder = (sortOrder : number) => {
        setSortDirection(sortOrder)
    }

    const handleSearch = (e: any) => {
        let searchValue = e.target.value;
        setProductName(searchValue);
    }

    const handleSortType = (sortType: number) => {
        setSortDirection(CAMPAIGN_SORT_DIRECTION.ASC)
        setSortBy(sortType);
    }

    return (
        <div
            className="w-full relative bg-gray-100 ml-56"
        >
            <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div className="flex bg-white mx-4 mt-5 max-h-full border rounded-xl px-5 py-2 items-center justify-start gap-5">
                    <span className="text-xl">Sắp xếp theo:</span>
                    <Button className={`${sortBy === CAMPAIGN_SORT_TYPE.NAME
                        ? "bg-red-600 text-white hover:bg-red-500 hover:text-gray"
                        : "bg-white"}`}
                            onClick={() => handleSortType(CAMPAIGN_SORT_TYPE.NAME)}
                    >
                        Tên sản phẩm
                    </Button>
                    <Button className={`${sortBy === CAMPAIGN_SORT_TYPE.REVENUE
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black"
                        : "bg-white"}`}
                            onClick={() => handleSortType(CAMPAIGN_SORT_TYPE.REVENUE)}
                    >
                        Doanh số
                    </Button>
                    <Button className={`${sortBy === CAMPAIGN_SORT_TYPE.END_DATE
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black"
                        : "bg-white"}`}
                            onClick={() => handleSortType(CAMPAIGN_SORT_TYPE.END_DATE)}
                    >
                        Thời gian kết thúc
                    </Button>
                    <span className="flex items-center gap-5 text-xl ml-auto">
                        Thứ tự:
                        <IconButton aria-label="up"
                                    size="small"
                                    onClick={() => handleSortOrder(CAMPAIGN_SORT_DIRECTION.ASC)}
                                    disabled={sortBy === CAMPAIGN_SORT_TYPE.DEFAULT}>
                        <ArrowCircleUpIcon className={`h-10 w-10 
                        ${sortDirection === CAMPAIGN_SORT_DIRECTION.ASC && sortBy !== CAMPAIGN_SORT_TYPE.DEFAULT ? "text-green-500" : "text-gray-500"}`}/>
                        </IconButton>

                        <IconButton aria-label="down"
                                    size="small"
                                    onClick={() => handleSortOrder(CAMPAIGN_SORT_DIRECTION.DESC)}
                                    disabled={sortBy === CAMPAIGN_SORT_TYPE.DEFAULT}>
                        <ArrowCircleDownIcon className={`h-10 w-10 
                        ${sortDirection === CAMPAIGN_SORT_DIRECTION.DESC ? "text-red-500" : "text-gray-500"}`}/>
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
                        value={status}
                        className="bg-white ml-auto h-16 border rounded-2xl w-2/6"
                        inputProps={{'aria-label': 'Without label'}}
                        onChange={handleStatusChange}
                    >
                        <MenuItem disabled value="">
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
                        {data.data.content.map((campaign, index) => (
                            <ListItem button
                                      onClick={() => router.push(`/seller/campaign/${campaign.id}`)}
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
                                            {(getCurrentPrice2(campaign) * campaign.currentSaleQuantity).toLocaleString()}đ
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
                                            {campaign.status === CAMPAIGN_DISPLAY_STATUS.ACTIVE
                                            && <span className="font-bold text-green-500">ĐANG BÁN</span>}
                                            {campaign.status === CAMPAIGN_DISPLAY_STATUS.HIDDEN
                                            && <span className="font-bold text-red-500">ĐÃ ẨN</span>}
                                            {campaign.status === CAMPAIGN_DISPLAY_STATUS.COMPLETE
                                            && <span className="font-bold text-blue-500">HOÀN THÀNH</span>}
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
                                        page={page}
                                        onChange={handlePaging}
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
