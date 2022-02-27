import React, {Dispatch, SetStateAction} from "react";
import {TextField} from "@mui/material";

const UserInfo: React.FC<UserInfoProps> = ({setPhoneNumber, setReceiverName, phoneNumber, receiverName}) => {
    const handleNameChange = (e) => {
        const name = e.target.value;
        setReceiverName(name);
    }
    const handlePhoneChange = (e) => {
        const name = e.target.value;
        setPhoneNumber(name);
    }
    return (
        <form>
            <div className="flex flex-col my-5 px-5 gap-y-5 w-1/2">
                <TextField
                    id="outlined-error"
                    required
                    value={receiverName}
                    label="Tên người nhận"
                    onChange={handleNameChange}
                />
                <TextField
                    id="outlined-error-helper-text"
                    required
                    value={phoneNumber}
                    label="Số điện thoại"
                    onChange={handlePhoneChange}
                />
            </div>
        </form>
    )
}

interface UserInfoProps {
    receiverName: string,
    phoneNumber: string,
    setPhoneNumber: Dispatch<SetStateAction<string>>,
    setReceiverName: Dispatch<SetStateAction<string>>,
}

export default UserInfo;