import React, { useContext } from 'react';
import { FavContext } from './favContex';

const Favourites = () => {
  const { fav } = useContext(FavContext);

  return (
    <div>
      {fav.length === 0 ? (
        <p> No plant added</p>
      ) : (
        <ul className="favPlant">
          {fav.map((item, index) => (
            <li key={index}>
              <img src={item.images[0]} alt={item.name} />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favourites;
