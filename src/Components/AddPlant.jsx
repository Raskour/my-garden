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
            sx: { width: '500px', maxHeight: '700px' },
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
            fullWidth
          />

          {/* <label>Price</label> */}
          <TextField
            name="price"
            label="Price"
            value={newPlant.price}
            onChange={handleNewPlant}
            fullWidth
          />

          {/* <label>Add image</label> */}
          <TextField
            type="text"
            label="Add Image"
            name="image"
            value={newPlant.image}
            onChange={handleNewPlant}
            fullWidth
          />

          {/* <TextField
            type="text"
            label="Water Requirement"
            name="waterRequirements"
            value={newPlant.waterRequirements}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          /> */}
          <FormControl>
            <InputLabel id="waterReq">Water Requirements</InputLabel>
            <Select
              id="water_req"
              name="waterRequirements"
              value={newPlant.waterRequiremets}
              onChange={handleNewPlant}
              label="Water Requirements"
              labelId="waterReq"
            >
              <MenuItem value="Once a week">Once a week</MenuItem>
              <MenuItem value="Twice a week">Twice a week</MenuItem>
              <MenuItem value="Everyday">Everyday</MenuItem>
              <MenuItem value="Every other day">Every other day</MenuItem>
              <MenuItem value="Once in 2 weeks">Once in 2 weeks</MenuItem>
            </Select>
          </FormControl>

          {/* <TextField
            type="text"
            label="Sunlight"
            name="sunlight"
            value={newPlant.sunlight}
            onChange={handleNewPlant}
            size="small"
            fullWidth
          /> */}

          <FormControl>
            <InputLabel id="sunlight">Sunlight</InputLabel>
            <Select
              id="sun"
              name="sunlight"
              value={newPlant.sunlight}
              onChange={handleNewPlant}
              label="Sunlight"
              labelId="sunlight"
            >
              <MenuItem value="Full sun">Full sun</MenuItem>
              <MenuItem value="Indirect light">Indirect light</MenuItem>
              <MenuItem value="Bright indirect light">
                Bright indirect light
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={newPlant.category}
              onChange={handleNewPlant}
              label="Category"
            >
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
