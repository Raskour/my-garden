import React from 'react';

const CategorySearch = ({ selectedCategory, handleCategory }) => {
  return (
    <div>
      <form className="category">
        <label>Category</label>
        <select value={selectedCategory} onChange={handleCategory}>
          <option value="All">All Plants</option>
          <option value="Indoor">Indoor Plants</option>
          <option value="Outdoor">Outdoor Plants</option>
          <option value="Medicinal">Medicinal Plants</option>
          <option value="Herb">Herb</option>
        </select>
      </form>
    </div>
  );
};

export default CategorySearch;
