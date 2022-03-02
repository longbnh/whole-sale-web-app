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
            <div className="flex flex-col my-5 px-5 gap-y-5 w-full">
                <div className="relative w-2/5 h-20 p-0 m-0">
                    <TextField
                        required
                        className="w-full"
                        value={receiverName}
                        label="Tên người nhận"
                        inputProps={{maxLength: 50}}
                        onChange={handleNameChange}
                    />
                    <div className="absolute right-5 bottom-1/2 text-gray-500 w-100" style={{pointerEvents: "none"}}>
                        {receiverName.length} / 50
                    </div>
                </div>

                <div className="relative w-2/5 h-20 p-0 m-0">
                    <TextField
                        required
                        className="w-full"
                        value={phoneNumber}
                        label="Số điện thoại"
                        inputProps={{maxLength: 20}}
                        onKeyPress={event => {
                            const regex = /\d/
                            if (!regex.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        onChange={handlePhoneChange}
                    />
                    <div className="absolute right-5 bottom-1/2 text-gray-500 w-100" style={{pointerEvents: "none"}}>
                        {receiverName.length} / 20
                    </div>
                </div>
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