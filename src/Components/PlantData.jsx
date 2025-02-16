import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPlantById } from '../plantService';

const PlantData = () => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { plantId } = useParams();

  useEffect(() => {
    async function getPlant() {
      const result = await getPlantById(plantId);
      setLoading(false);
      setPlant(result);
    }
    getPlant();
  }, [plantId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!plant) {
    return <p>Plant not found</p>;
  }

  return (
    <div className="data-container">
      <div className="plant-data">
        <h2>{plant.name}</h2>
        <img src={plant.images[0]} alt="" />
        <p>Category: {plant.category}</p>
        <p>Features: {plant.features}</p>
        <p>Price: {plant.price}</p>
        <p>Water Requirement: {plant.water_requirements}</p>
        <p>Sunlight: {plant.sunlight}</p>
      </div>
    </div>
  );
};

export default PlantData;
