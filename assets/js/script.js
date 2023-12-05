// Initialize Leaflet Map
var map = L.map('map').setView([18.2, 66.5], 1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Map Click
map.on('click', function(e) {
  var clickedPoint = e.latlng;
  alert('Clicked coordinates: ' + clickedPoint.lat + ', ' + clickedPoint.lng);
});

// Function to handle displaying coordinates when a marker is clicked
function onMarkerClick(e) {
  var clickedMarker = e.latlng;
  alert('Marker coordinates: ' + clickedMarker.lat + ', ' + clickedMarker.lng);
}

var csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTuYq4O9hSnJhYTob1RLkWE_3QN_REwf5N1z3-gp4yfldD2MLe5GKDEiCr6yKgMOnUDpTLdFgm4VkVG/pub?output=csv';

// Use Google Sheets to CSV for Plotting
fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    var lines = data.split('\n');
    var mapPoints = [];

    for (var i = 1; i < lines.length; i++) {
      var columns = lines[i].split(',');
      if (columns.length >= 3) {
        var timestamp = columns[0];
        var longitude = parseFloat(columns[1]);
        var latitude = parseFloat(columns[2]);

        mapPoints.push(L.latLng(latitude, longitude)); // Create latLng object
      }
    }

    // Adding markers to the map based on fetched data
    mapPoints.forEach(point => {
      L.marker(point).addTo(map); // Use latLng object for marker creation
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to handle getting user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Do something with userLat and userLng
        console.log('Latitude:', userLat);
        console.log('Longitude:', userLng);

        // Optionally, display coordinates to the user
        alert('Latitude: ' + userLat + '\nLongitude: ' + userLng);
      },
      function (error) {
        console.error('Error getting location:', error);
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Attach the getLocation function to the button click event
document.getElementById('getLocationBtn').addEventListener('click', getLocation);


