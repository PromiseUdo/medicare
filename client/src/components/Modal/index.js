import React from 'react';
import {Zoom,Dialog,DialogActions,DialogContent,
    DialogContentText,DialogTitle,Button} from '@material-ui/core';


const Modal = props => { 
    const{open,title,divide,children,handleClose,actions,...rest} = props;
return ( 
    <Zoom  in={open}>
    <Dialog
        
        open={open}
        TransitionComponent={Zoom}
        keepMounted
        onClose={handleClose}
        {...rest}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent dividers={divide}>
          <DialogContentText component='div' id="alert-dialog-slide-description">
           {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actions.map(action =>{
              return (<Button key={action.id} onClick={action.handler} color="primary">
              {action.text}
            </Button>)
            
          }) }
        </DialogActions>
      </Dialog>
    </Zoom>);

}


export default Modal;