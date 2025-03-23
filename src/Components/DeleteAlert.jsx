import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';

const DeleteAlert = ({
  handleRemoveButton,
  open,
  handleClose,
  handleClickOpen,
}) => {
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete plant
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the plant
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveButton}>Confirm</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteAlert;
