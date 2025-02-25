import React, { useContext, useEffect, useState } from 'react';
//import plantData from '../mockdata.json';
import PlantCard from './PlantCard';
// import { getPlants } from '../plantService';
import { Link } from 'react-router-dom';
import SearchPlant from './SearchPlant';
import CategorySearch from './CategorySearch';
import AddPlant from './AddPlant';
// import { FavContext } from '../favContex';
import { Button } from '@mui/material';

const Home = () => {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState(plantData.plants);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);
  // const [fav, setFav] = useState([]);
  // const [favCount, setfavCount] = useState(0);

  const [newPlant, setNewPlant] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
  });

  const [selectedCategory, setSelectedCategory] = useState('All');

  // const { setFavCount } = useContext(FavContext);
  // const { fav, setFav } = useContext(FavContext);

  // useEffect(() => {
  //   async function getData() {
  //     const data = await getPlants();
  //     setData(data.plants);
  //   }
  //   getData();
  // }, []);

  useEffect(() => {
    async function getPlantData() {
      const data = await fetch('http://localhost:8004/plants');
      const result = await data.json();
      setData(result.plants);
      setFilteredData(result.plants);
    }
    getPlantData();
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

  async function handleAddPlant(e) {
    e.preventDefault();
    if (!newPlant.name || !newPlant.category || !newPlant.price) {
      alert('Please type in all the required details');
      return;
    }

    const plant = {
      id: crypto.randomUUID(),
      name: newPlant.name,
      category: newPlant.category,
      price: Number(newPlant.price),
      images: [newPlant.image],
    };

    const res = await fetch('http://localhost:8004/addPlant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Add this line
      },
      body: JSON.stringify(plant),
    });

    if (!res.ok) {
      alert(res.error);
      return;
    }

    // const result = await res.json();
    // alert(result.message);

    const newData = [plant, ...data];

    setData(newData);
    setFilteredData(newData);
    setOpen(false);
  }

  async function handleFav(e, id) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch('http://localhost:8004/favPlants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Add this line
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        alert(res.error);
        return;
      }

      const result = await res.json();
      alert(result.message);

      // setfavCount((prevCount) => prevCount + 1);
      // // const favPlant = data.find((plant) => plant.id === id);
      // setFav([...fav, result]);
    } catch (err) {
      console.error('Error adding to fav', err);
    }
  }

  async function handleRemoveButton(e, id) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:8004/deletePlant/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Add this line
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        alert(res.error);
        return;
      }
      const filteredPlants = data.filter((plant) => plant.id !== id);
      setData(filteredPlants);
      setFilteredData(filteredPlants);
    } catch (err) {
      console.error('Error deleting the plant');
    }
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <h1 className="heading">Ras Garden</h1>

      <SearchPlant
        input={input}
        handleInput={handleInput}
        handleSearch={handleSearch}
      />
      <AddPlant
        handleAddPlant={handleAddPlant}
        handleNewPlant={handleNewPlant}
        newPlant={newPlant}
        handleClose={handleClose}
        open={open}
      />
      <CategorySearch
        selectedCategory={selectedCategory}
        handleCategory={handleCategory}
      />
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="container">
          <Button
            className="plant-card add-new-plant"
            onClick={handleOpen}
            sx={{ border: '2px dotted' }}
          >
            <span>+</span>Add new plant
          </Button>

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
              <button onClick={(e) => handleRemoveButton(e, plant.id)}>
                Delete plant
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
