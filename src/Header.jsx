import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ favCount }) => {
  return (
    <div className="header">
      <Link to={'/'}>Home</Link>
      <Link to={'/about'}>About Us</Link>
      <span>Favourites({favCount})</span>
    </div>
  );
};

export default Header;
