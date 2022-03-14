import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from "@mui/material/Stack";
import React from "react";

interface CustomAutoCompleteProps {
    options: any [];
    onChange?: (e: any, value: any) => void;
    title: string;
    displayValue: string;
    value?: any;
    error?: boolean;
    errorContent?: string;
}

export const isString = (item: any): item is string => {
    return typeof item === "string";
};


const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
                                                                   options,
                                                                   onChange,
                                                                   title,
                                                                   displayValue,
                                                                   value,
                                                                   error,
                                                                   errorContent,
                                                               }) => {

    return (
        <Stack spacing={2} sx={{width: 300}}>
            <Autocomplete
                autoComplete
                autoHighlight
                value={value}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={title}
                        error={error}
                        helperText={errorContent}
                        InputProps={{
                            ...params.InputProps,
                            type: 'text',
                        }}
                    />
                )}
                onChange={onChange}
                options={options}
                getOptionLabel={(option: any) =>
                    isString(option[displayValue]) ? option[displayValue] : ""
                }
            />
        </Stack>
    );
};

export default CustomAutoComplete;
