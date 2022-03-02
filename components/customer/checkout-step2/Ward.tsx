import React, {useEffect, useState} from "react";
import {IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Divider, Input, List, ListItem, ListItemText} from "@mui/material";
import {AddressUnitProps} from "./CreateAddressContent";
import {SearchIcon} from "@heroicons/react/solid";

export const Ward: React.FC<AddressUnitProps> = ({handleClick, unit, id}) => {
    const [wards, setWards] = useState<IAddressUnit[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        if (unit !== undefined) {
            addressApi.getWards(unit.id)
                .then((response) => {
                    setWards(response.data);
                })
                .catch(error => {
                    //handle error here
                })
        }
    }, [])

    const handleSearchWard = (e:any) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    return (
        <>
            <div className="flex items-center bg-white w-full h-16 p-5 relative border rounded-2xl">
                <div className="w-5/6">
                    <Input fullWidth
                           onChange={handleSearchWard}
                           placeholder="Tìm kiếm phường/ xã..."
                           disableUnderline/>
                </div>
                <SearchIcon className="w-5 h-5 absolute right-5"/>
            </div>
            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {wards.filter(ward => ward.name.includes(searchValue)).map(ward => (
                        <>
                            <ListItem button key={ward.id} onClick={() => handleClick(ward)}
                                      className={`${id === ward.id ? "bg-green-400" : ""}`}>
                                <ListItemText primary={ward.name} secondary={ward.divisionType}/>
                            </ListItem>
                            <Divider/>
                        </>
                    )
                )}
            </List>
        </>
    )
}