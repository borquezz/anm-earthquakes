//Google Maps annd Geocoder API class to handle the requests to Google
export class GoogleMap {
  // Initializing an empty map with default center in Honolulu.
  constructor(center = { lat: 21.315603, lng: -157.858093 }) {
    this.center = center;
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: this.center,
      zoom: 8,
    });
    // Initializing geocoder and bounds object to keep track of the current location bounding box
    this.geocoder = new google.maps.Geocoder();
    this.bounds = {
      north: null,
      south: null,
      east: null,
      west: null,
    };
    // Array to keep markers & circles restricted to 10
    this.markers = [];
    this.circles = [];
    // History of searched places
    this.history = [];
    // Flag used to know if a new search has been performed and delete previous markers
    this.newSearch = false;
    // Add listener to keep track of the current viewport bounds
    // in case the user wants to use current viewport's location
    google.maps.event.addListener(this.map, "idle", () => {
      let bounds = this.map.getBounds();
      let ne = bounds.getNorthEast();
      let sw = bounds.getSouthWest();
      this.bounds = {
        north: ne.lat(),
        south: sw.lat(),
        east: ne.lng(),
        west: sw.lng(),
      };
    });
  }

  //Set a new center for the viewport
  setCenter(coords) {
    this.map.center = { lat: coords.lat, lng: coords.lng };
    this.map.setCenter(this.map.center);
  }

  // Add a marker to the map, with its respective information label
  addMarker(coords, magnitude, datetime) {
    // The information label, to pop when marker is clicked
    const infoWindow = new google.maps.InfoWindow();
    const title = `<h6>Date: ${datetime.substring(
      0,
      10
    )}<br/>Time: ${datetime.substring(11)}<br/>Magnitude: ${String(
      magnitude
    )}</h6>`;
    // The marker itself
    const marker = new google.maps.Marker({
      // Passing the attributes
      position: coords,
      map: this.map,
      label: String(magnitude),
      title: title,
      optimized: false,
    });

    // Add event listener to trigger info label when clicked
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });

    // If a new search was performed, delete the previous markers
    if (this.newSearch) {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];
      // Reset the newSearch flag
      this.newSearch = false;
    }
    // Add the marker to markers array
    this.markers.push(marker);
  }

  // DEV-ONLY: Draws a rectangle given a certain bounding box
  drawRectangle(bounds) {
    const rectangle = new google.maps.Rectangle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.2,
      map: this.map,
      bounds: {
        north: bounds.north,
        south: bounds.south,
        east: bounds.east,
        west: bounds.west,
      },
    });
  }

  // Draws a circle with radius based on the magnitude of the earthquake
  addCircle(coords, magnitude) {
    const cityCircle = new google.maps.Circle({
      strokeColor: "white",
      strokeOpacity: 0.8,
      strokeWeight: 0.5,
      fillColor: "#FF0000",
      fillOpacity: 0.2,
      map: this.map,
      center: coords,
      radius: Math.sqrt(magnitude) * 2000,
    });
    // If a new search was performed, delete the previous circles
    if (this.newSearch) {
      this.circles.forEach((circle) => {
        circle.setMap(null);
      });
      this.circles = [];
    }
    // Add the circle to circles array
    this.circles.push(cityCircle);
  }

  // To run after geoCode method. Updates the class instance to the new location obtained in geoCode method
  updateAddress(props) {
    //Update new location's bounding box
    this.bounds = {
      north: props.geometry.bounds.Ab.g,
      south: props.geometry.bounds.Ab.h,
      east: props.geometry.bounds.Ra.h,
      west: props.geometry.bounds.Ra.g,
    };
    //Update map center to new location
    this.center = props.geometry.location;
    //Draw the new bounding box
    // this.drawRectangle(this.bounds);
    //Set new map center
    this.map.setCenter(this.center);
    //Add marker in the center
    // this.addMarker(this.center);
  }

  // Google GeoCode API Method
  // Reads the address in text input and returns lat, lng and bounding box, amongst other data
  geoCode() {
    let address = document.getElementById("address").value;
    this.history.push(address);
    this.newSearch = true;
    return this.geocoder.geocode(
      { address: address },
      function (results, status) {
        if (status == "OK") {
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }
}
