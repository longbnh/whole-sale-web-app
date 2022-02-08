import React, {useState} from "react";
import useSWR from "swr";
import productApi from "../../../api/productApi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {SORT_TYPE} from "../../../shared/enum/enum";
import {Pagination} from "@mui/material";
import Stack from "@mui/material/Stack";

const Content = () => {
    const [pageIndex, setPageIndex] = useState(1);
    const {data, error} = useSWR([
        1,
        pageIndex,
        SORT_TYPE.ID_ASC,
    ], productApi.getProducts, {
        revalidateOnFocus: true
    });
    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56 h-full"
            // style={{ height: "calc(100vh - 50px)" }}
        >
            <div className="bg-white mt-5 mx-auto w-4/5 overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col align-center gap-5 justify-start p-4 mt-5 ml-5">
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell align="center">Mô tả</TableCell>
                                    <TableCell align="center">Giá gốc</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.data.content?.map(product => {
                                    return (
                                        <TableRow
                                            key={product.name}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >

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
                            <Pagination count={data?.data?.totalPage} variant="outlined" shape="rounded"/>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Content;
