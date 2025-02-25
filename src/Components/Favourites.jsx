import React, { useContext, useEffect, useState } from 'react';
// import { FavContext } from '../favContex';

const Favourites = () => {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    async function getFavPlants() {
      const res = await fetch('http://localhost:8004/favPlants');

      const data = await res.json();
      setFav(data);
    }
    getFavPlants();
  }, []);

  async function handleRemovePlant(id) {
    const res = await fetch(`http://localhost:8004/favPlants/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      alert('Error removing plant');
      return;
    }
    const deletedPlant = fav.filter((plant) => plant.id !== id);
    setFav(deletedPlant);
  }

  return (
    <div>
      {fav.length === 0 ? (
        <p> Please Add some Plants</p>
      ) : (
        <ul className="fav-plant-list">
          {fav.map((item, index) => (
            <li key={index} className="fav-plant">
              <img src={item.images[0]} alt={item.name} />
              <span>{item.name}</span>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemovePlant(item.id)}>
                Remove Plant
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
