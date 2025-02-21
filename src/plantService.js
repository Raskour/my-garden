//const plantData = require('./mockdata.json');
const fs = require('fs').promises;
// async function getPlants() {
//   return plantData;
// }

async function getPlants() {
  const data = await fs.readFile('./src/mockdata.json', 'utf-8');
  return JSON.parse(data);
}
// async function getPlantById(id) {
//   const result = plantData.plants.find((plant) => plant.id === Number(id));

//   return result;
// }

async function getPlantById(id) {
  const data = await fs.readFile('./src/mockdata.json', 'utf-8');
  const res = JSON.parse(data);
  const result = res.plants.find((plant) => plant.id === id);
  return result;
}

async function getFavPlants() {
  const data = await fs.readFile('./favPlant.json', 'utf-8');
  return JSON.parse(data);
}
module.exports = { getPlantById, getPlants, getFavPlants };
