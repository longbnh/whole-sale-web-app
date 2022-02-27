import React, {useEffect, useState} from "react";
import {IAddressUnit} from "../../../shared/models/IAddress";
import addressApi from "../../../api/addressApi";
import {Divider, List, ListItem, ListItemText} from "@mui/material";
import {AddressUnitProps} from "./CreateAddressContent";

export const Ward:  React.FC<AddressUnitProps> = ({handleClick, unit}) => {
    const [wards, setWards] = useState<IAddressUnit[]>([]);
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
    return (
        <List style={{maxHeight: '100%', overflow: 'auto'}}>
            {wards.map(ward => (
                    <>
                        <ListItem button key={ward.id} onClick={() => handleClick(ward)}>
                            <ListItemText primary={ward.name} secondary={ward.divisionType}/>
                        </ListItem>
                        <Divider/>
                    </>
                )
            )}
        </List>
    )
}