import React, {SetStateAction, useEffect, useState} from "react";
import {IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Divider, List, ListItem, ListItemText} from "@mui/material";
import {AddressUnitProps} from "./CreateAddressContent";

export const City: React.FC<AddressUnitProps> = ({handleClick, id}) => {
    const [cities, setCities] = useState<IAddressUnit[]>([]);
    useEffect(() => {
        addressApi.getCities()
            .then((response) => {
                setCities(response.data);
            })
            .catch(error => {
                //handle error here
            })
    }, [])
    return (
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {cities.map(city => (
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
    )
}