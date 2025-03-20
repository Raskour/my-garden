import { Box } from '@mui/material';
import React from 'react';

const PlantCard = ({ image, title, waterRequirements, sunlight }) => {
  console.log({ waterRequirements, sunlight });
  return (
    <div className="plant-card">
      <img className="image" src={image} alt="" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0.5rem',
          gap: 1,
        }}
      >
        <span className="title">{title}</span>
        <span>
          {waterReq[waterRequirements.toLowerCase()]}

          <small>{waterRequirements}</small>
        </span>
        <span>
          {sunReq[sunlight.toLowerCase()]}
          {sunlight}
        </span>
      </Box>
    </div>
  );
};

export default PlantCard;

const waterReq = {
  'once a week': '💧',
  'twice a week': '💧💧',
  'once in 2 weeks': '💧',
  everyday: '💧💧💧💧',
  'every other day': '💧💧💧',
};

const sunReq = {
  'full sun': '🌞🌞',
  'bright indirect light': '🌞',
  'indirect light': '🔆',
};
