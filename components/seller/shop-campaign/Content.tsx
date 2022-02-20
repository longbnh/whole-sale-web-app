import React, {useState} from "react";
import {Button} from "@mui/material";
import {CustomSelect, StyledOption} from "../../commons/CustomSelect";

const Content = () => {

    interface SortDirection {
        name: string;
        value: string;
    }

    const options: SortDirection[] = [
        {
            name: "low to high",
            value: "asc"
        },
        {
            name: "high to low",
            value: "dec"
        },
    ]

    const [campaign, setCampaign] = React.useState<SortDirection | null>(options[0]);
    const [sortBy, setSortBy] = useState("name")

    return (
        <div
            className="w-full relative bg-gray-100 ml-56"
        >
            <div className="bg-white mx-4 w-full overflow-y-auto overflow-x-hidden min-h-screen">
                <div className="flex mx-4 max-h-full border rounded-xl p-2 items-center gap-5">
                    <span>Sắp xếp theo</span>
                    <Button className={`${sortBy === "name" 
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black" 
                        : "bg-white"}`}>Tên sản phẩm</Button>
                    <Button className={`${sortBy === "revenue"
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black"
                        : "bg-white"}`}>Doanh số</Button>
                    <Button className={`${sortBy === "endDate"
                        ? "bg-red-600 text-white hover:bg-red-300 hover:text-black"
                        : "bg-white"}`}>Thời gian kết thúc</Button>
                    <CustomSelect value={campaign}
                                  className="ml-auto"
                                  onChange={setCampaign}>
                        {
                            options.map((option) => (
                                <StyledOption value={option} key={option.value}>
                                    {option.name}
                                </StyledOption>
                            ))
                        }
                    </CustomSelect>
                </div>

            </div>
        </div>
    );
};

export default Content;
