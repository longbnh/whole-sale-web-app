import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface AlertDialogProps {
    title: string;
    content: string;
    btName: string;
    open: boolean;
    handleClickClose: any;
    btConfirmName?: string;
    handleConfirm?: any;
}

export const CustomAlertDialog: React.FC<AlertDialogProps> = ({
                                                                  title,
                                                                  content,
                                                                  btName,
                                                                  open,
                                                                  handleClickClose,
                                                                  btConfirmName,
                                                                  handleConfirm
                                                              }) => {


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {btConfirmName !== undefined &&
                        <Button onClick={handleConfirm} color="error">
                            {btConfirmName}
                        </Button>
                    }
                    <Button onClick={handleClickClose} autoFocus>
                        {btName}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}