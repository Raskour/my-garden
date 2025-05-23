const fs = require('fs').promises;
const path = require('path');
const pool = require('./db');

const mockDataPath = path.join(__dirname, 'mockdata.json'); // Correct path
const favPlantPath = path.join(__dirname, 'favPlant.json'); // Correct path
const loginPath = path.join(__dirname, 'userDetails.json');

// async function getPlants() {
//   const data = await fs.readFile(mockDataPath, 'utf-8');
//   return JSON.parse(data);
// }

async function getPlants() {
  const data = await pool.query('SELECT * FROM "all plants table"');
  return data.rows;
}
// async function getPlantById(id) {
//   const data = await fs.readFile(mockDataPath, 'utf-8');
//   const res = JSON.parse(data);
//   return res.plants.find((plant) => plant.id === id);
// }

async function getPlantById(id) {
  const data = await pool.query(
    `SELECT * FROM "all plants table" where id=$1`,
    [id]
  );
  return data.rows[0];
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

// async function addNewPlant(body) {
//   const data = await fs.readFile(mockDataPath, 'utf-8');
//   const plantData = JSON.parse(data);
//   const newPlantData = [body, ...plantData.plants];

//   await fs.writeFile(mockDataPath, JSON.stringify({ plants: newPlantData }));
// }

async function addNewPlant(body) {
  const { name, category, sunlight, water_requirements, price, image } = body;
  const result = await pool.query(
    `INSERT INTO "all plants table"
    (name,category,sunlight,water_requirements,price,image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [name, category, sunlight, water_requirements, price, image]
  );

  return result.rows[0];
}

// async function deletePlant(id) {
//   const data = await fs.readFile(mockDataPath, 'utf-8');
//   const plantData = JSON.parse(data);
//   const newPlant = plantData.plants.filter((plant) => plant.id !== id);

//   await fs.writeFile(
//     mockDataPath,
//     JSON.stringify({ plants: newPlant }, null, 2)
//   );
// }

async function deletePlant(id) {
  const result = await pool.query(
    `DELETE FROM "all plants table" where id = $1 RETURNING *`,
    [id]
  );

  return result.rows[0];
}

// async function editPlant(id, body) {
//   const data = await fs.readFile(mockDataPath, 'utf-8');
//   const plantData = JSON.parse(data);
//   const plantIndex = plantData.plants.findIndex((plant) => plant.id === id);

//   if (plantIndex === -1) {
//     throw new Error('Plant with this ID not found');
//   }

//   plantData.plants[plantIndex] = body;
//   await fs.writeFile(mockDataPath, JSON.stringify(plantData));
// }

async function editPlant(id, body) {
  const { name, category, sunlight, water_requirements, price, image } = body;
  const result = await pool.query(
    `UPDATE "all plants table" SET name=$1, category = $2,
         sunlight = $3,
         water_requirements = $4,
         price = $5,
         image = $6 WHERE id= $7 RETURNING *`,
    [name, category, sunlight, water_requirements, price, image, id]
  );

  if (result.rowCount === 0) {
    throw new Error('Plant with this ID not found');
  }

  return result.rows[0];
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
