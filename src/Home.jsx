import React, { useEffect, useState } from 'react';
import plantData from './mockdata.json';
import PlantCard from './PlantCard';
import { getPlants } from './plantService';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(plantData.plants);
  const [input, setInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function getData() {
      const data = await getPlants();
      setData(data.plants);
    }
    getData();
  }, []);

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();

    const result = data.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    // const result = data.filter(
    //   (item) => item.name.toLowerCase() === input.toLowerCase()
    // );

    // use input insted of e.target.value in case of forms, the onSubmit handler doesnot accept e.target.value

    setFilteredData(result);
    setInput('');
  }

  function handleCategory(e) {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === 'All') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((plant) => plant.category === category);
      setFilteredData(filtered);
    }
  }

  function handleAddPlant() {}

  return (
    <div>
      <h1 className="heading">Ras Garden</h1>
      <form className="searchbar" onSubmit={handleSearch}>
        <label></label>
        <input
          placeholder="type a plant name"
          value={input}
          onChange={handleInput}
        />

        <button>Search</button>
      </form>
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
      <button className="add-plant" onClick={handleAddPlant}>
        Add Plant
      </button>
      <div className="container">
        {filteredData.map((plant) => (
          <Link to={'/plants/' + plant.id} key={plant.id}>
            <PlantCard image={plant.images[0]} title={plant.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
