import plantData from './mockdata.json';
export async function getPlants() {
  return plantData;
}
export async function getPlantById(id) {
  const result = plantData.plants.find((plant) => plant.id === Number(id));
  console.log({ result, id });
  return result;
}
