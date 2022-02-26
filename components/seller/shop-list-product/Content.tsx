import React, {useState} from "react";
import useSWR from 'swr'
import productApi from "../../../api/productApi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    APP_PATH,
    CAMPAIGN_DISPLAY_STATUS,
    CAMPAIGN_SORT_DIRECTION,
    CAMPAIGN_SORT_TYPE,
    SORT_TYPE
} from "../../../shared/enum/enum";
import {
    Avatar,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Pagination,
    Select
} from "@mui/material";
import Stack from "@mui/material/Stack";
import {IProduct} from "../../../shared/models/IProduct";
import {Order} from "../../../shared/type/type";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {getCurrentPrice} from "../../../shared/utils/CampaignUtils";
import {useRouter} from "next/router";
import {IRequestPage, IRequestPageAlter} from "../../../shared/models/IRequestPage";
import {IImage} from "../../../shared/models/IImage";

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IProduct) => void;
    order: Order;
    orderBy: string;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof IProduct;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Tên sản phẩm',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Mô tả',
    },
    {
        id: 'originalPrice',
        numeric: true,
        disablePadding: false,
        label: 'Giá gốc',
    },
];

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof IProduct) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell align="right">
                    #
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const Content = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [sortBy, setSortBy] = useState(SORT_TYPE.ID_ASC);
    const [name, setName] = useState<string>("");
    const [order, setOrder] = React.useState<Order>('asc');
    const [status, setStatus] = useState<number>(0);
    const [orderBy, setOrderBy] = React.useState<keyof IProduct>('name');
    const router = useRouter();

    let pageParam: IRequestPage = {
        Page: page,
        PageSize: pageSize,
        Sort: sortBy,
    }
    const {data, error} = useSWR([
        1,
        name,
        status,
        pageParam,
    ], productApi.getProducts, {
        revalidateOnFocus: true
    });

    const handlePaging = (e: any, page: number) => {
        setPage(page)
    }


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
                                        page={page}
                                        onChange={handlePaging}
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
