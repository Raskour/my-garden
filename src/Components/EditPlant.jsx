import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

const EditPlant = ({
  handleEditPlant,
  handleUpdatePlant,
  editPlant,
  handleEditClose,
  openEdit,
}) => {
  return (
    <div>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleUpdatePlant,
          },
        }}
      >
        <DialogTitle>Update Plant</DialogTitle>
        <DialogContent
          sx={{
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '80%',
          }}
        >
          {/* <label>Plant Name</label> */}
          <TextField
            name="name"
            label="Plant Name"
            value={editPlant.name}
            onChange={handleEditPlant}
            size="small"
            fullWidth
          />

          {/* <label>Price</label> */}
          <TextField
            name="price"
            label="Price"
            value={editPlant.price}
            onChange={handleEditPlant}
            size="small"
            fullWidth
          />

          {/* <label>Add image</label> */}
          <TextField
            type="text"
            label="Add Image"
            name="image"
            value={editPlant.image}
            onChange={handleEditPlant}
            size="small"
            fullWidth
          />

          <div>
            <label>Category</label>
            <select
              name="category"
              value={editPlant.category}
              onChange={handleEditPlant}
            >
              <option>Please choose an option</option>
              <option value="Indoor">Indoor Plants</option>
              <option value="Outdoor">Outdoor Plants</option>
              <option value="Herbs">Herbs</option>
              <option value="Medicines">Medicinal Plants</option>
            </select>
            {/* <input
              name="category"
              value={newPlant.category}
              onChange={handleNewPlant}
            ></input> */}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" size="small" type="submit">
            Save Plant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPlant;
