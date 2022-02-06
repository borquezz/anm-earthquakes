import { GoogleMap } from "./map.js";

async function getEarthquakes(bounds) {
  const result = await fetch(
    `http://api.geonames.org/citiesJSON?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}&lang=de&username=reinier`
  );

  const data = await result.json();
  return data;
}

let map = new GoogleMap();

document.getElementById("submit").addEventListener("click", async function () {
  let address = await map.geoCode();
  map.updateAddress(address.results[0]);
  const earthquakes = await getEarthquakes(map.bounds);
  earthquakes.geonames.forEach((location) => {
    map.addMarker({ lat: location.lat, lng: location.lng });
  });
});
