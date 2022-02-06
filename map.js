export class GoogleMap {
  constructor(center = { lat: 21.315603, lng: -157.858093 }) {
    this.center = center;
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: this.center,
      zoom: 9,
    });
    this.geocoder = new google.maps.Geocoder();
    this.bounds = {
      north: null,
      south: null,
      east: null,
      west: null,
    };
  }

  addMarker(coords) {
    new google.maps.Marker({
      position: coords,
      map: this.map,
    });
  }

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

  geoCode() {
    let address = document.getElementById("address").value;
    return this.geocoder.geocode(
      { address: address },
      function (results, status) {
        if (status == "OK") {
          //If API returns some bounds
          //   return JSON.stringify({
          //     bounds: {
          //       north: results[0].geometry.bounds.Ab.g,
          //       south: results[0].geometry.bounds.Ab.h,
          //       east: results[0].geometry.bounds.Ra.h,
          //       west: results[0].geometry.bounds.Ra.g,
          //     },
          //     center: results[0].geometry.location,
          //   });
          //   drawRectangle(this.bounds);
          // this.map.setCenter(this.center);
          // addMarker({ coords: this.center });
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }
}
