const express = require('express');
const fs = require('fs');
var cors = require('cors');
//const plantData = require('./mockdata.json');
const { getPlantById, getPlants, getFavPlants } = require('./plantService');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/plants', async (req, res) => {
  const result = await getPlants();
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

app.get('/favPlants', async (req, res) => {
  const result = await getFavPlants();
  console.log(result);
  res.json(result);
});

app.get('/plants/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await getPlantById(id);
  if (!result) {
    return res.status(404).json({ error: 'Plant not found' });
  }

  res.json(result);
});

const PORT = 8004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
