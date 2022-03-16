import {Alert, AppBar, Box, Button, IconButton, Snackbar, Tab, Tabs, Toolbar} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import {City} from "./City";
import {District} from "./District";
import {Ward} from "./Ward";
import {DetailAddress} from "./DetailAddress";
import {IAddress, IAddressUnit} from "../../../shared/models/IAddress";
import UserInfo from "./UserInfo";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import addressApi from "../../../api/addressApi";

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export interface AddressUnitProps {
    handleClick: (unit: IAddressUnit) => void;
    unit?: IAddressUnit;
    id: number;
}

export interface MarkerProps {
    latitude: number;
    longitude: number;
}

const DEFAULT_VALUE: IAddressUnit = {
    id: -1,
    name: "",
    divisionType: "",
};

enum ADDRESS_TYPE {
    USER = 0,
    CITY = 1,
    DISTRICT = 2,
    WARD = 3,
    DETAIL = 4,
}

interface CreateAddressProp {
    handleClose: any
}

const CreateAddressContent: React.FC<CreateAddressProp> = ({handleClose}) => {
    const [value, setValue] = useState(ADDRESS_TYPE.USER);
    const [city, setCity] = useState<IAddressUnit>(DEFAULT_VALUE);
    const [district, setDistrict] = useState<IAddressUnit>(DEFAULT_VALUE);
    const [ward, setWard] = useState<IAddressUnit>(DEFAULT_VALUE);
    const [marker, setMarker] = useState<MarkerProps>(); //keep the lat and lng value
    const [addressDetail, setAddressDetail] = useState<string>("");
    const [receiverName, setReceiverName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const handleClick = (unit: IAddressUnit) => {
        switch (value) {
            case ADDRESS_TYPE.USER:
                setValue(ADDRESS_TYPE.CITY);
                break;
            case ADDRESS_TYPE.CITY:
                setCity(unit);
                //reset state
                setAddressDetail("");
                setDistrict(DEFAULT_VALUE);
                setWard(DEFAULT_VALUE);
                setValue(ADDRESS_TYPE.DISTRICT);
                break;
            case ADDRESS_TYPE.DISTRICT:
                setDistrict(unit);
                //reset state
                setAddressDetail("");
                setWard(DEFAULT_VALUE);
                setValue(ADDRESS_TYPE.WARD);
                break;
            case ADDRESS_TYPE.WARD:
                setAddressDetail("");
                setWard(unit);
                setValue(ADDRESS_TYPE.DETAIL);
        }
    }

    function handleError(content: string) {
        setError(content)
        setErrorShow(true);
    }

    const handleSubmit = async () => {
        try {
            if (ward.id !== -1
                && addressDetail !== ""
                && marker?.latitude
                && marker?.longitude
                && receiverName !== ""
                && phoneNumber != "") {
                const addressParam: IAddress = {
                    detailAddress: addressDetail,
                    latitude: marker?.latitude,
                    longitude: marker?.longitude,
                    wardId: ward.id,
                    receiverName: receiverName,
                    phoneNumber: phoneNumber,
                    addressType: 0,
                    isPrimary: false,
                }
                await addressApi.createAddress(addressParam);
                handleClose();
            }
            else {
                if (receiverName === "") {
                    handleError("Tên người nhận bị thiếu!");
                    return;
                }
                if (phoneNumber === "") {
                    handleError("Số điện thoại nhận hàng bị thiếu!");
                    return;
                }
                let regex = "(84|0[3|5|7|8|9])+([0-9]{8})\\b";
                if (!phoneNumber.match(regex)) {
                    handleError("Số điện thoại không hợp lệ!");
                    return;
                }
                if (addressDetail === "") {
                    handleError("Địa chỉ chi tiết bị thiếu!");
                    return;
                }
                if (!marker?.latitude || !marker?.longitude) {
                    handleError("Một số dữ liệu bị thiếu!");
                    return;
                }
            }
        } catch (error) {
            //TODO handle error here
        }
    }
    return (
        <div className="w-full max-h-screen">
            <AppBar sx={{position: 'relative'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        Tạo địa chỉ mới
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Toolbar>
            </AppBar>
            <Box className="h-4/5">
                <Tabs value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example">
                    <Tab label="Thông tin cá nhân" {...a11yProps(ADDRESS_TYPE.USER)} />
                    <Tab label="Tỉnh/ Thành" {...a11yProps(ADDRESS_TYPE.CITY)} />
                    <Tab label="Thành Phố/ Quận Huyện"
                         disabled={city.id === -1} {...a11yProps(ADDRESS_TYPE.DISTRICT)} />
                    <Tab label="Phường Xã" disabled={district.id === -1} {...a11yProps(ADDRESS_TYPE.WARD)} />
                    <Tab label="Địa chỉ cụ thể" disabled={ward.id === -1} {...a11yProps(ADDRESS_TYPE.DETAIL)} />
                </Tabs>
                <div className="h-full">
                    {value === ADDRESS_TYPE.USER
                    && <UserInfo phoneNumber={phoneNumber} receiverName={receiverName}
                                 setPhoneNumber={setPhoneNumber} setReceiverName={setReceiverName}/>}
                    {value === ADDRESS_TYPE.CITY && <City handleClick={handleClick} id={city.id}/>}
                    {value === ADDRESS_TYPE.DISTRICT &&
                    <District handleClick={handleClick} unit={city} id={district.id}/>}
                    {value === ADDRESS_TYPE.WARD && <Ward handleClick={handleClick} unit={district} id={ward.id}/>}
                    {value === ADDRESS_TYPE.DETAIL
                    && <DetailAddress city={city} district={district} ward={ward}
                                      marker={marker}
                                      setAddressDetail={setAddressDetail}
                                      setMarker={setMarker}/>}
                </div>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={errorShow}
                autoHideDuration={6000}
                sx={{ width: '100%' }}
                onClose={() => setErrorShow(false)}
                key={"error"}
            >
                <Alert severity="error" sx={{ width: '80%' }}>{error}</Alert>
            </Snackbar>
        </div>
    )
}

export default CreateAddressContent;