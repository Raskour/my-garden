import React from 'react';

const SearchPlant = ({ handleSearch, input, handleInput }) => {
  return (
    <div>
      <form className="searchbar" onSubmit={handleSearch}>
        <label></label>
        <input
          placeholder="type a plant name"
          value={input}
          onChange={handleInput}
        />

        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchPlant;
