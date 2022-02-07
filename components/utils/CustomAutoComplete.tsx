import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from "@mui/material/Stack";
import React from "react";

interface CustomAutoCompleteProps {
    options: any [];
    onChange?: (e:any, value:any) => void;
    title: string;
    displayValue: string;
}

export const isString = (item: any): item is string => {
    return typeof item === "string";
};


const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
                                                                   options,
                                                                   onChange,
                                                                   title,
    displayValue
                                                               }) => {

    return (
        <Stack spacing={2} sx={{width: 300}}>
            <Autocomplete
                disableClearable
                autoComplete
                autoHighlight
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
                onChange={onChange}
                options={options}
                className="mb-5"
                getOptionLabel={(option: any) =>
                    isString(option[displayValue]) ? option[displayValue] : ""
                }
            />
        </Stack>
    );
};

export default CustomAutoComplete;
