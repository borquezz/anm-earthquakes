import { GoogleMap } from "./map.js"; //Import GoogleMap class

// Async function to call the geonames API (earthquakes)
async function getEarthquakes(bounds) {
  const result = await fetch(
    `http://api.geonames.org/earthquakesJSON?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}&lang=en&username=reinier`
  );

  const data = await result.json();
  return data;
}

//Initialize a new empty map
let map = new GoogleMap();

// When submit button is clicked
document.getElementById("submit").addEventListener("click", async function () {
  // Get the address lat, lng and bounding box from geocode API
  let address = await map.geoCode();
  // Update the map with new location
  map.updateAddress(address.results[0]);
  // Call the geonames API with the new address bounding box
  const earthquakes = (await getEarthquakes(map.bounds)).earthquakes;
  // If geonames returns an empty array, alert the user
  if (earthquakes.length < 1)
    alert(`No earthquakes detected in the selected location`);
  else {
    // For each earthquake location, add a marker and a circle
    earthquakes.forEach((location) => {
      map.addCircle(
        { lat: location.lat, lng: location.lng },
        location.magnitude
      );
      map.addMarker(
        { lat: location.lat, lng: location.lng },
        location.magnitude
      );
    });
  }
});
