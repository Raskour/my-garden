import React from 'react';

const AddPlant = ({
  handleNewPlant,
  handleAddPlant,
  newPlant,
  handleFormCategory,
}) => {
  return (
    <div>
      <form className="form" onSubmit={handleAddPlant}>
        <div>
          <label>Plant Name</label>
          <input
            name="name"
            value={newPlant.name}
            onChange={handleNewPlant}
          ></input>
        </div>

        <div>
          <label>Price</label>
          <input
            name="price"
            value={newPlant.price}
            onChange={handleNewPlant}
          ></input>
        </div>
        <div>
          <label>Add image</label>
          <input
            type="text"
            name="image"
            value={newPlant.image}
            onChange={handleNewPlant}
          />
        </div>
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

        <button className="add-plant">Add Plant</button>
      </form>
    </div>
  );
};

export default AddPlant;
