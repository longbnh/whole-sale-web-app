import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import useSWR from 'swr'
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
import {ICampaign} from "../../../shared/models/ICampaign";
import CustomStepper from "../../commons/CustomStepper";
import Button from "@mui/material/Button";

const Content = () => {
    const [progress, setProgress] = React.useState(0);

    const campaign: ICampaign = {
        id: 1,
        startDate: '10/2/2022',
        endDate: '20/2/2022',
        currentSale: 50,
        inStockQuantity: 100,
        promotionPlanId: 0,
        status: 0,
        basicInfo: {
            id: "1",
            originalPrice: 50000,
            description: "abcdef",
            name: "Dien thoai",
        },
        milestones: [
            {
                price: 48000,
                quantity: 20
            },
            {
                price: 45000,
                quantity: 40
            },
            {
                price: 42000,
                quantity: 60
            },
            {
                price: 40000,
                quantity: 80
            },
        ]
    }

    function getProgress(campaign: ICampaign): number {
        return Math.max.apply(Math, campaign.milestones.map(milestone => milestone.quantity));
    }

    function getLastActiveMilestone(campaign: ICampaign): number {

        const sortedMilestonesQuantity = campaign.milestones.map(milestone => milestone.quantity).sort();
        const arrayOfActiveMilestone = sortedMilestonesQuantity
            .filter(quantity => quantity < campaign.currentSale);
        const largestActiveMilestone = Math.max.apply(Math, arrayOfActiveMilestone);
        return sortedMilestonesQuantity.indexOf(largestActiveMilestone);
    }

    console.log(getLastActiveMilestone(campaign))
    return (
        <div
            className="w-full relative flex bg-gray-100 ml-56"
            // style={{ height: "calc(100vh - 50px)" }}
        >
            <div className="bg-white mx-4 w-full overflow-y-auto overflow-x-hidden min-h-screen">
                <div className="flex flex-col w-5/6">
                    {campaign.basicInfo?.name}
                    <CustomStepper
                        milestones={campaign.milestones}
                        activeMilestone={getLastActiveMilestone(campaign)}
                        progress={campaign.currentSale}
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;
