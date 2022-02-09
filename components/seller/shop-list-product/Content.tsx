import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import useSWR  from 'swr'
import productApi from "../../../api/productApi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {SORT_TYPE} from "../../../shared/enum/enum";
import {FormControl, InputLabel, MenuItem, Pagination, Select} from "@mui/material";
import Stack from "@mui/material/Stack";
import {IProduct} from "../../../shared/models/IProduct";
import {Order} from "../../../shared/type/type";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IProduct) => void;
    order: Order;
    orderBy: string;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof IProduct;
    label: string;
    numeric: boolean;}

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
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof IProduct) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell>
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
    const [pageIndex, setPageIndex] = useState(1);
    const [sortType, setSortType] = useState(SORT_TYPE.ID_ASC);
    const {data, error} = useSWR([
        1,
        pageIndex,
        sortType,
    ], productApi.getProducts, {
        revalidateOnFocus: true
    });

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IProduct>('name');

    const [filter, setFilter] = React.useState<number>(0);
    // const [selected, setSelected] = React.useState<readonly string[]>([]);
    // const [page, setPage] = React.useState(0);
    // const [dense, setDense] = React.useState(false);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handlePaging = (e:any, page: number) => {
        setPageIndex(page)
    }

    function getSortType(order: Order, orderBy: keyof IProduct) {
        if (order === "asc" && orderBy === "name") return SORT_TYPE.NAME_ASC;
        if (order === "desc" && orderBy === "name") return SORT_TYPE.NAME_DESC;

        if (order === "asc" && orderBy === "originalPrice") return SORT_TYPE.PRICE_ASC;
        if (order === "desc" && orderBy === "originalPrice") return SORT_TYPE.PRICE_DESC;

        if (order === "asc" && orderBy === "description") return SORT_TYPE.DESCRIPTION_ASC;
        if (order === "desc" && orderBy === "description") return SORT_TYPE.DESCRIPTION_DESC;

        return SORT_TYPE.ID_ASC
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof IProduct,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setSortType(getSortType(order, orderBy))
    };

    const handleFilter = (e: any) => {

    }

    function getStatus(status: number) {
        switch (status) {
            case 0:
                return "Chưa bán";
            case 1:
                return "Đang bán";
            default:
                return "Chưa bán";
        }
    }


    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56 h-full"
            // style={{ height: "calc(100vh - 50px)" }}
        >
            <div className="bg-white mt-5 mx-auto w-4/5 overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col align-center gap-5 justify-start p-4 mt-5 ml-5">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Trạng thái"
                            onChange={handleFilter}
                        >
                            <MenuItem key={0} value={0}>
                                Chưa bán
                            </MenuItem>
                            <MenuItem key={1} value={1}>
                                Đang bán
                            </MenuItem>

                        </Select>
                    </FormControl>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {data && data.data.content?.map((product, index) => {
                                    return (
                                        <TableRow
                                            key={product.id}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + (pageIndex-1) * 10 + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {product.name}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {product.description}
                                            </TableCell>
                                            <TableCell align="right">
                                                {product.originalPrice}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className="flex justify-end">
                        <Stack spacing={2}>
                            <Pagination count={data?.data?.totalPage}
                                        onChange={handlePaging}
                                        variant="outlined"
                                        shape="rounded"/>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
