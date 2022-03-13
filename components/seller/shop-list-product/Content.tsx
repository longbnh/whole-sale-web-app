import React, {useState} from "react";
import useSWR from 'swr'
import productApi from "../../../api/productApi";
import {Avatar, Button, IconButton, Input, List, ListItem, MenuItem, Pagination, Select} from "@mui/material";
import Stack from "@mui/material/Stack";
import {ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronRightIcon, SearchIcon} from "@heroicons/react/solid";
import {IRequestPage, IRequestPageInitialState} from "../../../shared/models/IRequestPage";
import {IImage} from "../../../shared/models/IImage";
import {
    handleOrderUtil,
    handlePageUtil,
    handleSortUtil,
    handleStatusUtil,
    matchOrderType,
    matchSortType
} from "../../../utils/PageRequestUtils";
import {APP_PATH, PAGE_REQUEST} from "../../../shared/enum/enum";
import {ProductDisplayStatus, StatusQueryType} from "../../../shared/type/paginationTypes";
import ORDER_QUERY = PAGE_REQUEST.ORDER.ORDER_QUERY;
import PRODUCT = PAGE_REQUEST.SORT.PRODUCT;
import PRODUCT_DISPLAY = PAGE_REQUEST.STATUS.PRODUCT.PRODUCT_DISPLAY;
import PRODUCT_QUERY = PAGE_REQUEST.STATUS.PRODUCT.PRODUCT_QUERY;
import {useRouter} from "next/router";
import Image from 'next/image'

interface IProductStatus {
    id: StatusQueryType;
    name: string;
}

const productStatuses: IProductStatus[] = [
    {
        id: PRODUCT_QUERY.GET_ALL_ACTIVE_AND_SALE,
        name: "Tất cả"
    },
    {
        id: PRODUCT_QUERY.GET_ALL_ACTIVE_ONLY,
        name: "Sẵn sàng"
    },
    {
        id: PRODUCT_QUERY.GET_ALL_SALE_ONLY,
        name: "Đang bán"
    },
]

const Content = () => {
    const [productName, setProductName] = useState<string>("");
    let initialState: IRequestPage = {...IRequestPageInitialState, sort: PAGE_REQUEST.SORT.PRODUCT.NO_SEARCH}
    const [pageRequest, setPageRequest] = useState<IRequestPage>(initialState);
    const {data} = useSWR([
        1,
        productName,
        undefined,
        pageRequest,
    ], productApi.getProducts, {
        revalidateOnFocus: true
    });
    const router = useRouter();

    function renderStatus(status: ProductDisplayStatus) {
        console.log(status)
        switch (status) {
            case PRODUCT_DISPLAY.ON_SALE:
                return (
                    <span className="font-bold text-orange-500">ĐANG BÁN</span>
                )
            case PRODUCT_DISPLAY.ACTIVE:
                return (
                    <span className="font-bold text-green-500">SẴN SÀNG</span>
                )
            case PRODUCT_DISPLAY.DELETED:
                return (
                    <span className="font-bold text-red-500">ĐÃ XÓA</span>
                )
        }
    }

    const handleSearch = (e: any) => {
        let searchValue = e.target.value;
        handlePageUtil(1, setPageRequest);
        setProductName(searchValue);
    }

    return (
        <div
            className="w-full relative bg-gray-100 ml-56"
        >
            <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div
                    className="flex bg-white mx-4 mt-5 max-h-full border rounded-xl px-5 py-2 items-center justify-start gap-5">
                    <span className="text-xl">Sắp xếp theo:</span>
                    <Button className={`${matchSortType(pageRequest.sort, PRODUCT.BY_NAME)
                        ? "bg-red-600 text-white hover:bg-red-500 hover:text-gray"
                        : "bg-white"}`}
                            onClick={() => handleSortUtil(PRODUCT.BY_NAME, setPageRequest)}
                    >
                        Tên sản phẩm
                    </Button>
                    <Button className={`${matchSortType(pageRequest.sort, PRODUCT.BY_CREATE_DATE)
                        ? "bg-red-600 text-white hover:bg-red-500 hover:text-gray"
                        : "bg-white"}`}
                            onClick={() => handleSortUtil(PRODUCT.BY_CREATE_DATE, setPageRequest)}
                    >
                        Thời điểm tạo
                    </Button>
                    <span className="flex items-center gap-5 text-xl ml-auto">
                        Thứ tự:
                        <IconButton aria-label="up"
                                    size="small"
                                    onClick={() => handleOrderUtil(ORDER_QUERY.ASC, setPageRequest)}
                                    disabled={matchSortType(pageRequest.sort, PRODUCT.NO_SEARCH)}>
                        <ArrowCircleUpIcon className={`h-10 w-10 
                        ${matchOrderType(pageRequest.order, ORDER_QUERY.ASC)
                        && !matchSortType(pageRequest.sort, PRODUCT.NO_SEARCH)
                            ? "text-green-500"
                            : "text-gray-500"}`}/>
                        </IconButton>

                        <IconButton aria-label="down"
                                    size="small"
                                    onClick={() => handleOrderUtil(ORDER_QUERY.DESC, setPageRequest)}
                                    disabled={matchSortType(pageRequest.sort, PRODUCT.NO_SEARCH)}>
                        <ArrowCircleDownIcon className={`h-10 w-10 
                        ${matchOrderType(pageRequest.order, ORDER_QUERY.DESC)
                        && !matchSortType(pageRequest.sort, PRODUCT.NO_SEARCH)
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
                        {productStatuses.map(productStatus =>
                            <MenuItem value={productStatus.id} key={productStatus.id}>
                                {productStatus.name}
                            </MenuItem>)}
                    </Select>
                </div>
            </div>
            {data && <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div
                    className="bg-white mx-4 mt-5 overflow-y-auto p-2 overflow-x-hidden min-h-screen border rounded-xl">
                    <List className="h-auto">
                        {data.data.content.map((product, index) => (
                            <ListItem button
                                onClick={() => router.push(`${APP_PATH.SELLER.PRODUCT}/${product.id}`)}
                                      key={product.id}
                                      divider
                                      className="my-5 p-5 relative flex gap-16">
                                {product.productImages &&
                                <Avatar sx={{width: 100, height: 100}} variant="square">
                                    <Image src={(product.productImages as IImage[])[0].url} alt={"productImage"} width={100} height={100}/>
                                </Avatar>}
                                <div className="grid grid-cols-1">
                                    <div className="font-bold text-2xl">
                                        {product.name}
                                    </div>
                                    <div className="grid grid-cols-2 grid-rows-3">
                                        <div>
                                            Ngành hàng
                                        </div>
                                        <div>
                                            {product.category.name}
                                        </div>
                                        <div>
                                            Ngày tạo
                                        </div>
                                        <div>
                                            {new Date(Date.parse(product.createdAt)).toLocaleDateString('vi-VI', {
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
                                            {renderStatus(product.status)}
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
                                        onChange={(e, page) => handlePageUtil(page, setPageRequest)}
                                        variant="outlined"
                                        shape="rounded"/>
                        </Stack>
                    </div>}
                    {!(data.data.content.length > 0) &&
                    <div className="flex justify-center text-xl mt-16">Không tìm thấy kết quả phù hợp!</div>}
                </div>

            </div>}
        </div>
    );
}

export default Content;
