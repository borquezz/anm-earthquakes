function mapController() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 21.315603, lng: -157.858093 },
    zoom: 10,
  });
  let geocoder = new google.maps.Geocoder();

  // const geonames = JSON.parse(localStorage.getItem("data"));
  // geonames.forEach((location) => {
  //   addMarker({
  //     coords: { lat: location.lat, lng: location.lng },
  //   });
  // });

  function addMarker(props) {
    new google.maps.Marker({
      position: props.coords,
      map: map,
    });
  }
  function drawRectangle(bounds) {
    const rectangle = new google.maps.Rectangle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.2,
      map,
      bounds: {
        north: bounds.Ab.g,
        south: bounds.Ab.h,
        east: bounds.Ra.h,
        west: bounds.Ra.g,
      },
    });
  }
  function codeAddress() {
    let address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == "OK") {
        drawRectangle(results[0].geometry.bounds);
        map.setCenter(results[0].geometry.location);
        addMarker({ coords: results[0].geometry.location });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  return {
    addMarker: addMarker,
    codeAddress: codeAddress,
  };
}
// console.log(JSON.parse(localStorage.getItem("data")));
