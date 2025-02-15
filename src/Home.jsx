import React, { useContext, useEffect, useState } from 'react';
import plantData from './mockdata.json';
import PlantCard from './PlantCard';
import { getPlants } from './plantService';
import { Link } from 'react-router-dom';
import SearchPlant from './SearchPlant';
import CategorySearch from './CategorySearch';
import AddPlant from './AddPlant';
import Header from './Header';
import { FavContext } from './favContex';

const Home = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(plantData.plants);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const [newPlant, setNewPlant] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  const { favCount, setFavCount } = useContext(FavContext);
  const { fav, setFav } = useContext(FavContext);
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
    // if (!input.trim()) {
    //   //use .trim() to prevent spaces from being counted as input
    //   alert('Type a plant name');
    //   return;
    // }

    if (!input.trim()) {
      setError('Type a plant name');

      return;
    }

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

  function handleNewPlant(e) {
    const value = e.target.value;
    const inputName = e.target.name;

    setNewPlant((prevState) => {
      return { ...prevState, [inputName]: value };
    });
  }

  function handleAddPlant(e) {
    e.preventDefault();
    if (!newPlant.name || !newPlant.category || !newPlant.price) {
      alert('Please type in all the required details');
      return;
    }
    const plant = {
      id: data.length + 1,
      name: newPlant.name,
      category: newPlant.category,
      price: Number(newPlant.price),
      images: [newPlant.image],
    };
    const newData = [plant, ...data];
    setData(newData);
    setFilteredData(newData);
  }

  function handleFav(e, id) {
    e.preventDefault();
    e.stopPropagation();

    setFavCount((prevCount) => prevCount + 1);
    const favPlant = data.find((plant) => plant.id === id);
    setFav([...fav, favPlant]);
  }

  return (
    <div>
      <h1 className="heading">Ras Garden</h1>
      <Header favCount={favCount} />
      <SearchPlant
        input={input}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />
      <AddPlant
        handleAddPlant={handleAddPlant}
        handleNewPlant={handleNewPlant}
        newPlant={newPlant}
      />
      <CategorySearch
        selectedCategory={selectedCategory}
        handleCategory={handleCategory}
      />
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="container">
          {filteredData.map((plant) => (
            <Link to={'/plants/' + plant.id} key={plant.id}>
              <PlantCard
                image={plant.images[0]}
                title={plant.name}
                category={plant.category}
              />
              <button onClick={(e) => handleFav(e, plant.id)}>
                Add to fav
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
