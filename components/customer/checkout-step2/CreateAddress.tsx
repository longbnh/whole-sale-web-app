import {AppBar, Button, Dialog, IconButton, Toolbar} from "@mui/material";
import React, {SetStateAction} from "react";
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Typography from "@mui/material/Typography";
import CreateAddressContent from "./CreateAddressContent";


interface CreateAddressProps {
    open: boolean;
    handleClose: any;
}


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateAddress: React.FC<CreateAddressProps> = ({open, handleClose}) => {
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <CreateAddressContent handleClose={handleClose}/>
            </Dialog>
        </div>
    )
}
export default CreateAddress;