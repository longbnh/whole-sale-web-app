import React, {useState} from "react";
import useSWR from 'swr'
import productApi from "../../../api/productApi";
import {Avatar, Button, IconButton, List, ListItem, Pagination} from "@mui/material";
import Stack from "@mui/material/Stack";
import {ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {IRequestPage, IRequestPageInitialState} from "../../../shared/models/IRequestPage";
import {IImage} from "../../../shared/models/IImage";
import {handlePageUtil} from "../../../utils/PageRequestUtils";

const Content = () => {
    const [productName, setProductName] = useState<string>("");
     const [pageRequest, setPageRequest] = useState<IRequestPage>(IRequestPageInitialState);

    const {data} = useSWR([
        1,
        productName,
        pageRequest,
    ], productApi.getProducts, {
        revalidateOnFocus: true
    });


    return (
        <div
            className="w-full relative bg-gray-100 ml-56"
        >
            <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div
                    className="flex bg-white mx-4 mt-5 max-h-full border rounded-xl px-5 py-2 items-center justify-start gap-5">
                    <span className="text-xl">Sắp xếp theo:</span>
                    <Button className={`bg-red-600 text-white`}
                    >
                        Tên sản phẩm
                    </Button>
                    <Button className={`bg-red-600 text-white`}
                    >
                        Doanh số
                    </Button>
                    <Button className={`bg-red-600 text-white`}
                    >
                        Thời gian kết thúc
                    </Button>
                    <span className="flex items-center gap-5 text-xl ml-auto">
                        Thứ tự:
                        <IconButton aria-label="up"
                                    size="small"
                        >
                        <ArrowCircleUpIcon className={`h-10 w-10`}/>
                        </IconButton>

                        <IconButton aria-label="down"
                                    size="small">
                        <ArrowCircleDownIcon className={`h-10 w-10`}/>
                        </IconButton>
                    </span>
                </div>
            </div>
            {data && <div className="mx-4 overflow-y-auto overflow-x-hidden max-h-full">
                <div
                    className="bg-white mx-4 mt-5 overflow-y-auto p-2 overflow-x-hidden min-h-screen border rounded-xl">
                    <List className="h-auto">
                        {data.data.content.map((product, index) => (
                            <ListItem button
                                // onClick={() => router.push(`${APP_PATH.SELLER.}/${product.id}`)}
                                      key={product.id}
                                      divider
                                      className="my-5 p-5 relative flex gap-16">
                                {product.productImages &&
                                <Avatar sx={{width: 100, height: 100}} variant="square">
                                    <img src={(product.productImages as IImage[])[0].url}/>
                                </Avatar>}
                                <div className="grid grid-cols-1">
                                    <div className="font-bold text-2xl">
                                        {product.name}
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
