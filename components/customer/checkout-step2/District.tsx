import React, {useEffect, useState} from "react";
import {IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Divider, Input, List, ListItem, ListItemText} from "@mui/material";
import {AddressUnitProps} from "./CreateAddressContent";
import {SearchIcon} from "@heroicons/react/solid";

export const District: React.FC<AddressUnitProps> = ({handleClick, unit, id}) => {
    const [districts, setDistricts] = useState<IAddressUnit[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        if (unit !== undefined) {
            addressApi.getDistricts(unit.id)
                .then((response) => {
                    setDistricts(response.data);
                })
                .catch(error => {
                    //handle error here
                })
        }
    }, [])

    const handleSearchDistrict = (e:any) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    return (
        <>
            <div className="flex items-center bg-white w-full h-16 p-5 relative border rounded-2xl">
                <div className="w-5/6">
                    <Input fullWidth
                           onChange={handleSearchDistrict}
                           placeholder="Tìm kiếm quận huyện..."
                           disableUnderline/>
                </div>
                <SearchIcon className="w-5 h-5 absolute right-5"/>
            </div>
            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {districts.filter(district => district.name.includes(searchValue)).map(district => (
                        <>
                            <ListItem button key={district.id} onClick={() => handleClick(district)}
                                      className={`${id === district.id ? "bg-green-400" : ""}`}>
                                <ListItemText primary={district.name} secondary={district.divisionType}/>
                            </ListItem>
                            <Divider/>
                        </>
                    )
                )}
            </List>
        </>
    )
}