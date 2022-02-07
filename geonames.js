import { GoogleMap } from "./map.js"; //Import GoogleMap class
import { maxHeap } from "./maxHeap.js";

// Async function to call the geonames API (earthquakes)
async function getEarthquakes(bounds) {
  const result = await fetch(
    `http://api.geonames.org/earthquakesJSON?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}&lang=en&username=reinier`
  );

  const data = await result.json();
  return data;
}
async function getLargestEarthquakes(bounds) {
  // Format today's date
  let date = new Date().toLocaleDateString("en-GB").split("/").reverse();
  if (date[1].length < 2) date[1] = `0${date[1]}`;
  if (date[2].length < 2) date[2] = `0${date[2]}`;
  date = date.join("-");
  const minMagnitude = 5.7; // Tuning slider for opt results
  const maxRows = 500;
  const result = await fetch(
    `http://api.geonames.org/earthquakesJSON?north=${bounds.north}&south=${bounds.south}&east=${bounds.east}&west=${bounds.west}&date=${date}&maxRows=${maxRows}&minMagnitude=${minMagnitude}&lang=en&username=reinier`
  );

  const data = (await result.json()).earthquakes;

  // Create maxHeap to store the data
  let heap = new maxHeap();
  for (let i = 0; i < data.length; i++) {
    heap.add(data[i]);
  }
  // Extract the 10 max magnitudes from the heap
  const eq = [];
  for (let i = 0; i < 10; i++) {
    eq.push(heap.extractMax());
  }

  return eq;
}

//Initialize a new empty map
let map = new GoogleMap();
// Date formatting for request
// Largest Earthquakes with bounding box of the whole world
const largestEarthquakes = await getLargestEarthquakes({
  north: 85,
  south: -85,
  east: 179.999,
  west: -179.999,
});
console.log(largestEarthquakes);

// heap.peek();
// console.log(largestEq);

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
        location.magnitude,
        location.datetime
      );
    });
  }
});
