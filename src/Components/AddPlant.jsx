import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

const AddPlant = ({
  handleNewPlant,
  handleAddPlant,
  newPlant,
  handleClose,
  open,
}) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleAddPlant,
          },
        }}
      >
        <DialogTitle>Add a new Plant</DialogTitle>
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
            value={newPlant.name}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          />

          {/* <label>Price</label> */}
          <TextField
            name="price"
            label="Price"
            value={newPlant.price}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          />

          {/* <label>Add image</label> */}
          <TextField
            type="text"
            label="Add Image"
            name="image"
            value={newPlant.image}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          />

          <TextField
            type="text"
            label="Water Requirement"
            name="waterRequirements"
            value={newPlant.waterRequirements}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          />

          <TextField
            type="text"
            label="Sunlight"
            name="sunlight"
            value={newPlant.sunlight}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          />

          <div>
            <label>Category</label>
            <select
              name="category"
              value={newPlant.category}
              onChange={handleNewPlant}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" size="small" type="submit">
            Add Plant
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPlant;
