import ReactMapGL, {GeolocateControl, Marker} from '@goongmaps/goong-map-react';
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Autocomplete, Box, CircularProgress, Grid, TextField, Typography} from "@mui/material";
import goongMapApi from "../../../api/goongMapApi";
import {IPlace, IPrediction} from "../../../shared/models/goongMap/IPrediction";
import {IAddressUnit} from "../../../shared/models/IAddress";
import {LocationMarkerIcon} from "@heroicons/react/solid";
import {MarkerProps} from "./CreateAddressContent";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import {AxiosResponse} from "axios";


interface DetailAddressProps {
    city: IAddressUnit;
    district: IAddressUnit;
    ward: IAddressUnit;
    marker: MarkerProps | undefined;
    setMarker: Dispatch<SetStateAction<MarkerProps | undefined>>;
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
        setAddressDetail,
    }) => {
    const [viewport, setViewport] = useState<MapProps | undefined>();
    const [searchValue, setSearchValue] = useState<string>("");
    const [options, setOptions] = useState<readonly IPlace[]>([]);
    const [value, setValue] = React.useState<IPlace | null>(null);
    const [open, setOpen] = React.useState(false);
    let loading = false;

    const fetch = React.useMemo(
        () =>
            throttle((input: string,) => goongMapApi.searchByKeyword(
                `${input} ${ward.name} ${district.name} ${city.name}`
            ), 200,), [],
    );

    useEffect(() => {
        let active = true;
        if (searchValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }
        loading = true;
        const promise: Promise<AxiosResponse<IPrediction, any>> = fetch(searchValue);
        promise.then(response => {
                const predictions = response.data;
                const place = predictions.predictions;
                if (active) {
                    let newOptions: readonly IPlace[] = [];
                    if (value) {
                        newOptions = [value];
                    }
                    if (place) {
                        newOptions = [...newOptions, ...place];
                    }
                    setOptions(newOptions);
                }
            }
        )
        loading = false;

        return () => {
            active = false;
        };
    }, [value, searchValue, fetch])

    const handleSelect = async (newValue: IPlace | null) => {
        try {
            if (newValue) {
                const response = await goongMapApi.getPlaceDetail(newValue.place_id);
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
            }
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

    const geolocateControlStyle = {
        right: 10,
        top: 10
    };


    return (
        <div className="flex flex-col p-5 gap-y-5">
            <Autocomplete
                autoSelect
                disablePortal
                value={value}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                loading={loading}
                id="combo-box-demo"
                options={options}
                includeInputInList
                filterSelectedOptions
                autoComplete
                getOptionLabel={(option) =>
                    typeof option === 'string' ? option : option.description
                }
                sx={{width: 900}}
                filterOptions={(options) => options}
                onChange={async (e: any, newValue: IPlace | null) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                    await handleSelect(newValue);
                }}
                onInputChange={(event: any, newInputValue) => {
                    setSearchValue(newInputValue)
                }}
                renderInput={(params) =>
                    <TextField {...params}
                               label="Nhập địa chỉ của bạn"
                               InputProps={{
                                   ...params.InputProps,
                                   endAdornment: (
                                       <React.Fragment>
                                           {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                           {params.InputProps.endAdornment}
                                       </React.Fragment>
                                   ),
                               }}
                    />}
                renderOption={(props, option) => {
                    const matches = option.structured_formatting.main_text_matched_substrings;
                    const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match: any) => [match.offset, match.offset + match.length]),
                    );

                    return (
                        <li {...props}>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <Box
                                        component={LocationOnIcon}
                                        sx={{color: 'text.secondary', mr: 2}}
                                    />
                                </Grid>
                                <Grid item xs>
                                    {parts.map((part, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400,
                                            }}
                                        >
                    {part.text}
                  </span>
                                    ))}
                                    <Typography variant="body2" color="text.secondary">
                                        {option.structured_formatting.secondary_text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </li>
                    );
                }}
            />

            <span>
                    Hãy giúp chúng tôi xác định vị trí của bạn chính xác hơn bằng cách di chuyển dấu định vị phía trên bản đồ
                </span>

            <div className="self-center">
                {viewport && <ReactMapGL
                    {...viewport}
                    width={900}
                    height={500}
                    goongApiAccessToken={process.env.MAP_MAPTILES_KEY}
                    onViewportChange={nextViewport => setViewport(nextViewport)}
                >
                    <GeolocateControl
                        style={geolocateControlStyle}
                        showUserLocation={false}
                        onGeolocate={data => {
                            const location = data.coords;
                            setMarker({
                                latitude: location.latitude,
                                longitude: location.longitude,
                            })
                        }}
                        positionOptions={{enableHighAccuracy: true}}
                    />
                    {marker && <Marker latitude={marker.latitude}
                                       longitude={marker.longitude}
                                       onDragEnd={e => handleDragEnd(e)}
                                       draggable={true}
                                       offsetLeft={-20}
                                       offsetTop={-10}>
                        <LocationMarkerIcon className="h-10 w-10 mr-3 text-red-600"/>
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