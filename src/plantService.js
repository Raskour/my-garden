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

async function deleteFavPlant(id) {
  const data = await fs.readFile('./favPlant.json', 'utf-8');
  const res = JSON.parse(data);
  const result = res.filter((plant) => plant.id !== id);
  await fs.writeFile('./favPlant.json', JSON.stringify(result));
}

async function addNewPlant(body) {
  const data = await fs.readFile('./src/mockdata.json', 'utf-8');
  const plantData = JSON.parse(data);

  const newPlantData = [body, ...plantData.plants];
  await fs.writeFile(
    './src/mockdata.json',
    JSON.stringify({ plants: newPlantData })
  );
}

async function deletePlant(id) {
  const data = await fs.readFile('./src/mockdata.json', 'utf-8');
  const plantData = JSON.parse(data);
  const newPlant = plantData.plants.filter((plant) => plant.id !== id);

  await fs.writeFile(
    './src/mockdata.json',
    JSON.stringify({ plants: newPlant })
  );
}

async function editPlant(id, body) {
  const data = await fs.readFile('./src/mockdata.json', 'utf-8');
  const plantData = JSON.parse(data);
  const plantIndex = plantData.plants.findIndex((plant) => plant.id === id);
  console.log({ plantIndex });
  if (plantIndex === -1) {
    throw new Error('Plant with this id not found');
  }

  plantData.plants[plantIndex] = body;
  await fs.writeFile('./src/mockdata.json', JSON.stringify(plantData));
}
module.exports = {
  getPlantById,
  getPlants,
  getFavPlants,
  deleteFavPlant,
  addNewPlant,
  deletePlant,
  editPlant,
};
