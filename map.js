//Google Maps annd Geocoder API class to handle the requests to Google
export class GoogleMap {
  // Initializing an empty map with default center in Honolulu.
  constructor(center = { lat: 21.315603, lng: -157.858093 }) {
    this.center = center;
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: this.center,
      zoom: 9,
    });
    // Initializing geocoder and bounds object to keep track of the current location bounding box
    this.geocoder = new google.maps.Geocoder();
    this.bounds = {
      north: null,
      south: null,
      east: null,
      west: null,
    };
  }

  // Add a marker to the map, with its respective information label
  addMarker(coords, magnitude, title) {
    // The information label, to pop when marker is clicked
    const infoWindow = new google.maps.InfoWindow();
    // The marker itself
    const marker = new google.maps.Marker({
      // Passing the attributes
      position: coords,
      map: this.map,
      label: String(magnitude),
      title: "Date: 2011-03-11<br/>Time: 04:46<br/>Magnitude: 8.8",
      optimized: false,
    });

    // Add event listener to trigger info label when clicked
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
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
