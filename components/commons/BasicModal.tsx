import React from "react";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


interface CustomModalProps {
    btName: string
    childComp?: React.ReactNode;
}

const BasicModal: React.FC<CustomModalProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>{props.btName}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <React.Fragment>
                    {React.cloneElement(props.childComp as React.ReactElement<any>, {customProps: handleClose})}
                </React.Fragment>
            </Modal>
        </div>
    );
}

export default BasicModal;