import React from 'react';

const PlantCard = ({ image, title }) => {
  return (
    <div className="plant-card">
      <img className="image" src={image} alt="" />
      <span className="title">{title}</span>
    </div>
  );
};

export default PlantCard;
