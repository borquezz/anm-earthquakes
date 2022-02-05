// import fetch from "node-fetch";
const getEarthquakes = async () => {
  let coords = [44.1, -9.9, -22.4, 55.2];
  const result = await fetch(
    `http://api.geonames.org/citiesJSON?north=${coords[0]}&south=${coords[1]}&east=${coords[2]}&west=${coords[3]}&lang=de&username=reinier`
  );

  const data = await result.json();
  return data;
};
const earthquakes = await getEarthquakes();
localStorage.setItem("data", JSON.stringify(earthquakes.geonames));
