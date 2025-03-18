const express = require('express');
const fs = require('fs');
const path = require('path');
var cors = require('cors');
const favPlantPath = path.join(__dirname, 'favPlant.json');
//const plantData = require('./mockdata.json');
const {
  getPlantById,
  getPlants,
  getFavPlants,
  deleteFavPlant,
  addNewPlant,
  deletePlant,
  editPlant,
} = require('./plantService');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/plants', async (req, res) => {
  const page = Number(req.query.page ?? 1);

  const pageSize = Number(req.query.pageSize ?? 4);
  const category = req.query.category;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const result = await getPlants();
  let filteredPlants = result.plants;

  if (category) {
    filteredPlants = filteredPlants.filter((p) => p.category === category);
  }

  const totalPages = Math.ceil(filteredPlants.length / pageSize);
  const paginatedPlants = filteredPlants.slice(startIndex, endIndex);

  res.json({ paginatedPlants, totalPages });
});

app.get('/plants/:id', async (req, res) => {
  const id = req.params.id;

  const result = await getPlantById(id);
  if (!result) {
    return res.status(404).json({ error: 'Plant not found' });
  }

  res.json(result);
});

app.get('/favPlants', async (req, res) => {
  try {
    const result = await getFavPlants();

    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

app.post('/favPlants', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Plant ID is required' });
  }

  const plant = await getPlantById(id);

  const favPlants = await getFavPlants();

  const result = favPlants.find((favplant) => favplant.id === id);
  if (result) {
    return res.json({ message: 'Plant has already been added' });
  } else {
    favPlants.push(plant);

    fs.writeFile(favPlantPath, JSON.stringify(favPlants), (err) => {
      if (err) {
        console.error('Error writing to favPlant.json:', err);
        return res.status(500).json({ error: 'Failed to save favorite plant' });
      }
      return res.json({ message: 'Plant has been added to fav list' });
    });
  }
});

app.delete('/favPlants/:id', async (req, res) => {
  const id = req.params.id;
  await deleteFavPlant(id);
  res.json({ message: 'Success' });
});

app.post('/addPlant', async (req, res) => {
  const body = req.body;
  await addNewPlant(body);
  res.json({ message: 'Plant has been added' });
});

app.delete('/deletePlant/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await deletePlant(id);
    res.json({ message: 'Plant has been deleted' });
  } catch (err) {
    res.json(err);
  }
});

app.put('/editPlant/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log({ body });
  await editPlant(id, body);
  res.json({ message: 'Plant has been updated' });
});

const PORT = 8004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
