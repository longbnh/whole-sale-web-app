import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material/styles';
import {FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import Button from "../../utils/CustomButton";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px #000',
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const provinces = [
    'Thành phố HCM',
    'Đồng Nai',
    'Hà Nội',
    'Đà Nẵng',
];
const district = [
    'Quận 1',
    'Quận 2',
    'Quận 3',
];
const ward = [
    'Phường Tô Ký',
    'Phường XX',
    'Phường YY',
];

function getStyles(name: string, selectedName: string, theme: Theme) {
    return {
        fontWeight:
            selectedName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const AddressModal = (props:any) => {

    const theme = useTheme();
    const [provinceName, setProvinceName] = React.useState<string>('');
    const [districtName, setDistrictName] = React.useState<string>('');
    const [wardName, setWardName] = React.useState<string>('');

    const handleProvinceChange = (event: SelectChangeEvent<typeof provinceName>) => {
        const {
            target: { value },
        } = event;
        setProvinceName(
            value
        );
    };
    const handleDistrictChange = (event: SelectChangeEvent<typeof districtName>) => {
        const {
            target: { value },
        } = event;
        setDistrictName(
            // On autofill we get a stringified value.
            value
        );
    };
    const handleWardChange = (event: SelectChangeEvent<typeof wardName>) => {
        const {
            target: { value },
        } = event;
        setWardName(
            // On autofill we get a stringified value.
            value
        );
    };

    return (
        <div>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Cài đặt địa chỉ
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}} className="flex">
                    <div className="flex flex-col w-11/12 p-10 h-full gap-10">
                        <div className="flex flex-row">
                            <div className="flex items-center w-1/4">
                                <span className="flex required">Tỉnh/ Thành phố</span>
                            </div>
                            <div className="flex items-center">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl sx={{ m: 1, width: 300 }}>
                                        <Select
                                            displayEmpty
                                            value={provinceName}
                                            onChange={handleProvinceChange}
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>Tùy chọn</em>;
                                                }

                                                return selected;
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="">
                                                <em>Tùy chọn</em>
                                            </MenuItem>
                                            {provinces.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, provinceName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="flex items-center w-1/4">
                                <span className="flex required">Quận/ Huyện</span>
                            </div>
                            <div className="flex items-center">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl sx={{ m: 1, width: 300}}>
                                        <Select
                                            displayEmpty
                                            value={districtName}
                                            onChange={handleDistrictChange}
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>Tùy chọn</em>;
                                                }

                                                return selected;
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="">
                                                <em>Tùy chọn</em>
                                            </MenuItem>
                                            {district.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, districtName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex items-center w-1/4">
                                <span className="flex required">Phường/ Xã</span>
                            </div>
                            <div className="flex items-center">
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl sx={{ m: 1, width: 300}}>
                                        <Select
                                            displayEmpty
                                            value={wardName}
                                            onChange={handleWardChange}
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return <em>Tùy chọn</em>;
                                                }

                                                return selected;
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="">
                                                <em>Tùy chọn</em>
                                            </MenuItem>
                                            {ward.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={getStyles(name, wardName, theme)}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex items-center w-1/4">
                                <span className="flex required">Địa chỉ nhà</span>
                            </div>
                            <div className="flex items-center">
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': {m: 1, width: '25vw'},
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >

                                    <OutlinedInput placeholder="Nhập địa chỉ"/>
                                </Box>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-5">
                            <Button content="Đặt lại" size="100px" color="#FFFFFF" link="/seller/registerInfo" />
                            <Button content="Lưu" size="100px" link="/seller/registerInfo"/>
                        </div>
                    </div>
                </Typography>
            </Box>
        </div>
    );
}

export default AddressModal;