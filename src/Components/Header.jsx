import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavContext } from '../context/favContex';
import CategorySearch from './CategorySearch';

const Header = () => {
  const { favCount } = useContext(FavContext);
  return (
    <div className="header">
      <Link to={'/'}>Home</Link>
      <CategorySearch />
      <Link to={'/about'}>About Us</Link>
      <Link to={'/fav'}>Favourites({favCount})</Link>
    </div>
  );
};

export default Header;
