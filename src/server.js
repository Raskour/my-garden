const express = require('express');
const app = express();

const plantData = require('./mockdata.json');
const { getPlantById } = require('./plantService');

app.get('/plants', (req, res) => {
  res.json(plantData);
});

app.post('/', (req, res) => {});

app.get('/plants/:id', async (req, res) => {
  const id = Number(req.params.id);
  const result = await getPlantById(id);
  res.json(result);
});

const PORT = 8004;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
