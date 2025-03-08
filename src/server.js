const express = require('express');
const fs = require('fs');
var cors = require('cors');
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
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);

  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  const result = await getPlants();
  const totalPages = Math.ceil(result.plants.length / pageSize);
  const paginatedPlants = result.plants.slice(startIndex, endIndex);
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
  const result = await getFavPlants();

  res.json(result);
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

    fs.writeFile('./favPlant.json', JSON.stringify(favPlants), (err) => {
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
