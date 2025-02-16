import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavContext } from '../favContex';

const Header = () => {
  const { favCount } = useContext(FavContext);
  return (
    <div className="header">
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About Us</Link>
      <Link to={'/fav'}>Favourites({favCount})</Link>
    </div>
  );
};

export default Header;
