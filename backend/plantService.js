const fs = require('fs').promises;
const path = require('path'); // Import path module

const mockDataPath = path.join(__dirname, 'mockdata.json'); // Correct path
const favPlantPath = path.join(__dirname, 'favPlant.json'); // Correct path
const loginPath = path.join(__dirname, 'userDetails.json');

async function getPlants() {
  const data = await fs.readFile(mockDataPath, 'utf-8');
  return JSON.parse(data);
}

async function getPlantById(id) {
  const data = await fs.readFile(mockDataPath, 'utf-8');
  const res = JSON.parse(data);
  return res.plants.find((plant) => plant.id === id);
}

async function getFavPlants() {
  const data = await fs.readFile(favPlantPath, 'utf-8');
  if (!data.trim()) {
    console.warn('favPlant.json is empty');
  }
  return JSON.parse(data);
}

async function deleteFavPlant(id) {
  const data = await fs.readFile(favPlantPath, 'utf-8');
  const res = JSON.parse(data);
  const result = res.filter((plant) => plant.id !== id);
  await fs.writeFile(favPlantPath, JSON.stringify(result));
}

async function addNewPlant(body) {
  const data = await fs.readFile(mockDataPath, 'utf-8');
  const plantData = JSON.parse(data);
  const newPlantData = [body, ...plantData.plants];

  await fs.writeFile(mockDataPath, JSON.stringify({ plants: newPlantData }));
}

async function deletePlant(id) {
  const data = await fs.readFile(mockDataPath, 'utf-8');
  const plantData = JSON.parse(data);
  const newPlant = plantData.plants.filter((plant) => plant.id !== id);

  await fs.writeFile(
    mockDataPath,
    JSON.stringify({ plants: newPlant }, null, 2)
  );
}

async function editPlant(id, body) {
  const data = await fs.readFile(mockDataPath, 'utf-8');
  const plantData = JSON.parse(data);
  const plantIndex = plantData.plants.findIndex((plant) => plant.id === id);

  if (plantIndex === -1) {
    throw new Error('Plant with this ID not found');
  }

  plantData.plants[plantIndex] = body;
  await fs.writeFile(mockDataPath, JSON.stringify(plantData));
}

async function checkAuthentication(username, password) {
  const data = await fs.readFile(loginPath, 'utf-8');
  const userDetails = JSON.parse(data);

  if (username === userDetails.username && password === userDetails.password) {
    return true;
  }

  return false;
}

module.exports = {
  getPlantById,
  getPlants,
  getFavPlants,
  deleteFavPlant,
  addNewPlant,
  deletePlant,
  editPlant,
  checkAuthentication,
};
