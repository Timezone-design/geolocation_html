// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
  
//   const locationButton = document.createElement("button");

//   locationButton.textContent = "Pan to Current Location";
//   locationButton.classList.add("custom-map-control-button");
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
//   locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          
          map = new google.maps.Map(document.getElementsByTagName("body")[0].firstElementChild, {
              center: pos,
              zoom: 6,
            });
            
            var marker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                labelOrigin: new google.maps.Point(75, 32),
                size: new google.maps.Size(32,32),
                anchor: new google.maps.Point(16,32)
              },
            });
            
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 6,
        });
        infoWindow = new google.maps.InfoWindow();
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
//   });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}