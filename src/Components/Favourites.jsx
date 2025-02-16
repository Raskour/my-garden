import React, { useContext } from 'react';
import { FavContext } from '../favContex';

const Favourites = () => {
  const { fav } = useContext(FavContext);

  return (
    <div>
      {fav.length === 0 ? (
        <p> No plant added</p>
      ) : (
        <ul className="fav-plant-list">
          {fav.map((item, index) => (
            <li key={index} className="fav-plant">
              <img src={item.images[0]} alt={item.name} />
              <span>{item.name}</span>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
