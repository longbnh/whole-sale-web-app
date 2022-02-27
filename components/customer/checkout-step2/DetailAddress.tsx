import ReactMapGL, {Marker} from '@goongmaps/goong-map-react';
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Autocomplete, Box, TextField} from "@mui/material";
import goongMapApi from "../../../api/goongMapApi";
import {IPlace, IPrediction} from "../../../shared/models/goongMap/IPrediction";
import {IAddressUnit} from "../../../shared/models/IAddress";
import {LocationMarkerIcon} from "@heroicons/react/solid";
import {MarkerProps} from "./CreateAddressContent";


interface DetailAddressProps {
    city: IAddressUnit;
    district: IAddressUnit;
    ward: IAddressUnit;
    marker: MarkerProps | undefined;
    setMarker: Dispatch<SetStateAction<MarkerProps | undefined>>;
    options: readonly IPlace[],
    setOptions: Dispatch<SetStateAction<readonly IPlace[]>>;
    setAddressDetail: Dispatch<SetStateAction<string>>;
}

interface MapProps {
    latitude: number;
    longitude: number;
    zoom: number;
}

export const DetailAddress: React.FC<DetailAddressProps> = (
    {
        city,
        district,
        ward,
        marker,
        setMarker,
        options,
        setOptions,
        setAddressDetail,
    }) => {
    const [viewport, setViewport] = useState<MapProps | undefined>();
    const [searchValue, setSearchValue] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch()
        }, 2000)
        return () => clearTimeout(timer)
    }, [searchValue])


    const handleSearch = async () => {
        try {
            const response = await goongMapApi
                .searchByKeyword(`${searchValue} ${ward.name} ${district.name} ${city.name}`);
            const prediction = response.data;
            setOptions(prediction.predictions);
        } catch (error) {
            //handle error here
        }
    }

    const handleChangeSearchValue = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSelect = async (e: any) => {
        try {
            const index: number = e.target.value;
            const place: IPlace = options[index];
            const response = await goongMapApi.getPlaceDetail(place.place_id);
            const placeDetail = response.data;
            const geometry = placeDetail.result.geometry;
            setViewport({
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
                zoom: 15,
            })
            setMarker({
                latitude: geometry.location.lat,
                longitude: geometry.location.lng,
            })
            setAddressDetail(placeDetail.result.name);
        } catch (error) {
            //handle error here
        }
    }

    const handleDragEnd = (e: any) => {
        const [lng, lat] = e.lngLat;
        setMarker({
            longitude: lng,
            latitude: lat
        })
    }

    return (
        <div className="flex flex-col p-5 gap-y-5">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                placeholder="Hãy nhập địa chỉ của bạn để bắt đầu"
                options={options}
                getOptionLabel={option => option.description}
                sx={{width: 900}}
                onChange={handleSelect}
                onInputChange={event => handleChangeSearchValue(event)}
                renderInput={(params) =>
                    <TextField {...params}/>}
            />
            <div className="self-center">
                {viewport && <ReactMapGL
                    {...viewport}
                    width={900}
                    height={500}
                    goongApiAccessToken={process.env.MAP_MAPTILES_KEY}
                    onViewportChange={nextViewport => setViewport(nextViewport)}>
                    {marker && <Marker latitude={marker.latitude}
                                       longitude={marker.longitude}
                                       onDragEnd={e => handleDragEnd(e)}
                                       draggable={true}
                                       offsetLeft={-20}
                                       offsetTop={-10}>
                        <LocationMarkerIcon className="h-10 w-10 mr-3 text-red-400"/>
                    </Marker>}
                </ReactMapGL>}
                {viewport === undefined &&
                <img className="hover:cursor-not-allowed"
                     src="/world.svg" width={600} height={400}/>
                }
            </div>
        </div>
    );
}