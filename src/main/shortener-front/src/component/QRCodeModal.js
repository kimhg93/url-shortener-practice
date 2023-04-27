import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import QRCode from "qrcode.react"

const QRCodeModal = (props) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);

    return (
        <div>
            <Button variant="contained" onClick={handleShow}>
                QR코드 생성
            </Button>

            <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
                <DialogTitle>{"QR코드 생성"}</DialogTitle>
                <DialogContent>
                    <QRCode value={"https://www.naver.com"}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default QRCodeModal;
