'use client'

import { useState, useEffect } from 'react'
// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton';

export default function DialogCrud({children, propsDialog, setPropsDialog}) {
    const [open, setOpen] = useState(false)
    
    const handleClose = () => {
        setOpen(false)
        setPropsDialog(prevState => ({...prevState,active: false}))
    }

    useEffect(() => {
        setOpen(propsDialog.active ? true : false)
    },[propsDialog.active])
    return(
        <>
            <Dialog
                open={open}
                disableEscapeKeyDown
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose()
                    }
                }}
                aria-labelledby='form-dialog-title'
            >
                <DialogTitle id='form-dialog-title'>{propsDialog.title ? propsDialog.title : ''}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </IconButton>
                {children}
            </Dialog>
        </>
    )
}