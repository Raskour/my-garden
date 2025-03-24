import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
            sx: { width: '600px' },
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
            fullWidth
          />

          {/* <label>Price</label> */}
          <TextField
            name="price"
            label="Price"
            value={editPlant.price}
            onChange={handleEditPlant}
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
          <FormControl>
            <InputLabel id="plantCat">Category</InputLabel>
            <Select
              id="plant-cat"
              name="category"
              value={editPlant.category}
              onChange={handleEditPlant}
              label="Plant Category"
              labelId="plantCat"
            >
              <MenuItem>Please choose an option</MenuItem>
              <MenuItem value="Indoor">Indoor Plants</MenuItem>
              <MenuItem value="Outdoor">Outdoor Plants</MenuItem>
              <MenuItem value="Herbs">Herbs</MenuItem>
              <MenuItem value="Medicines">Medicinal Plants</MenuItem>
            </Select>
          </FormControl>

          {/* <input
              name="category"
              value={newPlant.category}
              onChange={handleNewPlant}
            ></input> */}
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
