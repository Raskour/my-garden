import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import React from 'react';

const DeletePlantDialog = ({
  handleRemoveButton,
  open,
  handleClose,
  deletePlant,
}) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the plant {deletePlant.name}
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

export default DeletePlantDialog;
