import React, {SetStateAction, useEffect, useState} from "react";
import {IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Divider, Input, List, ListItem, ListItemText} from "@mui/material";
import {AddressUnitProps} from "./CreateAddressContent";
import {SearchIcon} from "@heroicons/react/solid";

export const City: React.FC<AddressUnitProps> = ({handleClick, id}) => {
    const [cities, setCities] = useState<IAddressUnit[]>([]);
    const [searchValue, setSearchValue] = useState<string>("");
    useEffect(() => {
        addressApi.getCities()
            .then((response) => {
                setCities(response.data);
            })
            .catch(error => {
                //TODO handle error here
            })
    }, [])

    const handleSearchCity = (e:any) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    return (
        <div className="flex flex-col h-full gap-3">
            <div className="flex items-center bg-white w-full h-16 p-5 relative border rounded-2xl">
                <div className="w-5/6">
                    <Input fullWidth
                           onChange={handleSearchCity}
                           placeholder="Tìm kiếm thành phố..."
                           disableUnderline/>
                </div>
                <SearchIcon className="w-5 h-5 absolute right-5"/>
            </div>

            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {cities.filter(city => city.name.includes(searchValue)).map(city => (
                        <>
                            <ListItem button key={city.id} onClick={() => handleClick(city)}
                                      className={`${id === city.id ? "bg-green-400" : ""}`}>
                                <ListItemText primary={city.name} secondary={city.divisionType}/>
                            </ListItem>
                            <Divider/>
                        </>
                    )
                )}
            </List>
        </div>
    )
}