import React, { useContext, useEffect, useState } from 'react';
//import plantData from '../mockdata.json';
import PlantCard from './PlantCard';
// import { getPlants } from '../plantService';
import { Link, useSearchParams } from 'react-router-dom';
import SearchPlant from './SearchPlant';
import CategorySearch from './CategorySearch';
import AddPlant from './AddPlant';
// import { FavContext } from '../favContex';
import { Button } from '@mui/material';
import EditPlant from './EditPlant';
import Pagination from './Pagination';
import Theme from './Theme';
import { ThemeContext } from '../context/themeContext';
import DeletePlantDialog from './DeleteAlert';

const Home = () => {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState(plantData.plants);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  //const [theme, setTheme] = useState('light');
  //const [currentPage, setCurrentPage] = useState(0)
  const [searchParam, setSearchParam] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);

  // const [fav, setFav] = useState([]);
  // const [favCount, setfavCount] = useState(0);

  const [newPlant, setNewPlant] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    sunlight: '',
    waterRequirements: '',
  });

  const [editPlant, setEditPlant] = useState(null);
  const [deletePlant, setDeletePlant] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const { theme, setTheme } = useContext(ThemeContext);

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
      try {
        const queryString = new URLSearchParams(searchParam).toString(); // 'page=0&category=Outdoor'

        const data = await fetch(`http://localhost:8004/plants?${queryString}`);
        const { paginatedPlants, totalPages } = await data.json();

        setData(paginatedPlants);
        setFilteredData(paginatedPlants);
        setTotalPages(totalPages);
        //getPlantData(currentPage)
        //}, [currentPage])
      } catch (error) {
        console.error('Error fetching paginated plants:', error);
      }
    }

    getPlantData();
    // getPlantData(Number(searchParam.get('page') ?? 0)); (Old)
  }, [searchParam]);

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

    setSelectedCategory(category); // react use state variable update
    setSearchParam((prevParams) => {
      prevParams.set('category', category);
      return prevParams;
    }); // it will update the search param and useeffect reruns to send the api call with new query params

    // if (category === 'All') {
    //   setFilteredData(data);
    // } else {
    //   const filtered = data.filter((plant) => plant.category === category);
    //   setFilteredData(filtered);
    // }
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
    if (
      !newPlant.name ||
      !newPlant.category ||
      !newPlant.price ||
      !newPlant.sunlight ||
      !newPlant.waterRequirements
    ) {
      alert('Please type in all the required details');
      return;
    }

    const plant = {
      id: crypto.randomUUID(),
      name: newPlant.name,
      category: newPlant.category,
      price: Number(newPlant.price),
      image: newPlant.image,
      sunlight: newPlant.sunlight,
      water_requirements: newPlant.waterRequirements,
    };

    const res = await fetch('http://localhost:8004/addPlant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

  async function handleRemoveButton(e) {
    e.preventDefault();
    e.stopPropagation();

    // const isConfirmed = window.confirm(
    //   'Are you sure you want to delete the plant?'
    // );

    // if (!isConfirmed) return; // Stop execution if user cancels

    try {
      const res = await fetch(
        `http://localhost:8004/deletePlant/${deletePlant.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // Add this line
          },
        }
      );
      if (!res.ok) {
        alert(res.error);
        return;
      }
      const filteredPlants = data.filter(
        (plant) => plant.id !== deletePlant.id
      );
      setData(filteredPlants);
      setFilteredData(filteredPlants);
      setOpenDeleteModal(false);
    } catch (err) {
      console.error('Error deleting the plant');
    }
  }

  function handleEditPlant(e) {
    const value = e.target.value;
    const inputName = e.target.name;

    setEditPlant((prevState) => {
      return { ...prevState, [inputName]: value };
    });
  }
  async function handleUpdatePlant(e) {
    e.preventDefault();
    if (!editPlant.name || !editPlant.category || !editPlant.price) {
      alert('Please type in all the required details');
      return;
    }

    const plant = {
      ...editPlant,
      price: Number(editPlant.price),
    };

    const res = await fetch(`http://localhost:8004/editPlant/${editPlant.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Add this line
      },
      body: JSON.stringify(plant),
    });

    if (!res.ok) {
      alert(res.error);
      return;
    }
    const result = await res.json(); //need this just to create result, otherwise dont need result as i am not storing it anywhere
    const plantIndex = data.findIndex((plant) => plant.id === editPlant.id);

    const newData = data.toSpliced(plantIndex, 1, plant);

    setData(newData);
    setFilteredData(newData);
    setOpenEdit(false);

    // optional, just to add the additional alert message that the plant has been added
    setTimeout(() => {
      alert(result.message);
    }, 500);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleDeletePlant(e, plant) {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteModal(true);
    setDeletePlant(plant);
  }

  function handleDeleteClose(e) {
    e.preventDefault();
    e.stopPropagation();
    setOpenDeleteModal(false);
    setDeletePlant(null);
  }
  function handleEditClose() {
    setOpenEdit(false);
  }
  function handleEditOpen(e, plant) {
    e.preventDefault();
    e.stopPropagation();
    setEditPlant(plant);
    setOpenEdit(true);
  }
  // const Page_Size = 4;
  // const start = currentPage * Page_Size;
  // const end = start + Page_Size;
  // const totalPlants = data.length;
  // const numOfPages = Math.ceil(totalPlants / Page_Size);

  function handleNext() {
    //setCurrentPage((prev) => prev+1)

    const prevPage = searchParam.get('page');

    // setSearchParam({ page: Number(prevPage) - 1 });

    setSearchParam((prevParams) => {
      prevParams.set('page', Number(prevPage) + 1);
      return prevParams;
    });
  }

  function handlePrev() {
    //setCurrentPage((prev) => prev+1)
    const prevPage = searchParam.get('page');
    //setSearchParam({ page: Number(prevPage) - 1 });
    setSearchParam((prevParams) => {
      prevParams.set('page', Number(prevPage) - 1);
      return prevParams;
    });
  }

  function handleButton(n) {
    //setCurrentPage(n)
    //setSearchParam({ page: n });
    setSearchParam((prevParams) => {
      prevParams.set('page', n);
      return prevParams;
    });
  }

  function handleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const currentPage = Number(searchParam.get('page') ?? 1);

  return (
    <div>
      <h1 className="heading">Ras Garden</h1>
      <Theme theme={theme} handleTheme={handleTheme} />

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
      {editPlant && (
        <EditPlant
          handleUpdatePlant={handleUpdatePlant}
          handleEditPlant={handleEditPlant}
          editPlant={editPlant}
          handleEditClose={handleEditClose}
          openEdit={openEdit}
        />
      )}
      <CategorySearch
        selectedCategory={selectedCategory}
        handleCategory={handleCategory}
      />
      <DeletePlantDialog
        handleRemoveButton={handleRemoveButton}
        open={openDeleteModal}
        handleClose={handleDeleteClose}
        deletePlant={deletePlant}
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
            <Link
              style={{ textDecoration: 'none' }}
              to={'/plants/' + plant.id}
              key={plant.id}
            >
              <PlantCard
                image={plant.image}
                title={plant.name}
                waterRequirements={plant.water_requirements}
                sunlight={plant.sunlight}
              />

              <button onClick={(e) => handleFav(e, plant.id)}>
                Add to fav
              </button>
              <Button
                variant="outlined"
                onClick={(e) => handleDeletePlant(e, plant)}
                size="small"
              >
                Delete plant
              </Button>

              {/* <button onClick={(e) => handleRemoveButton(e, plant.id)}>
                Delete plant
              </button> */}
              <button onClick={(e) => handleEditOpen(e, plant)}>
                Edit Plant
              </button>
            </Link>
          ))}
        </div>
      )}

      <Pagination
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleButton={handleButton}
        currentPage={currentPage}
        numOfPages={totalPages}
      />
    </div>
  );
};

export default Home;
