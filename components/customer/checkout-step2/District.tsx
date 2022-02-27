import React, {useEffect, useState} from "react";
import {IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Divider, List, ListItem, ListItemText} from "@mui/material";
import {AddressUnitProps} from "./CreateAddressContent";

export const District:  React.FC<AddressUnitProps> = ({handleClick, unit, id}) => {
    const [districts, setDistricts] = useState<IAddressUnit[]>([]);
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
    return (
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {districts.map(district => (
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
    )
}