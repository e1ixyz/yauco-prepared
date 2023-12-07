// Initialize Leaflet Map
var map = L.map('map').setView([18.2, 66.5], 1.2);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTD6tLOjJj5OjMMPRsTEWaQQ2fiFDCOA4NhKjyVaH7yEB6L0DYDNhAx0IvavH1hRUd6U3gip__UQ_5l/pub?output=csv';

// Use Google Sheets to CSV for Plotting
fetch(csvUrl)
  .then(response => response.text())
  .then(data => {
    var lines = data.split('\n');

    for (var i = 1; i < lines.length; i++) {
      var columns = lines[i].split(',');
      if (columns.length >= 5) {
        var longitude = parseFloat(columns[1]);
        var latitude = parseFloat(columns[2]);
        var description = columns[3]; // Resource Description from column D
        var contact = columns[4]; // Resource Contact from column E

        var marker = L.marker([latitude, longitude]).addTo(map);
        
        // Create the popup content based on available data
        var popupContent = 'Latitude: ' + latitude + '<br>Longitude: ' + longitude;
        if (description.trim() !== '') {
          popupContent += '<br>Resource Description: ' + description;
        }
        if (contact.trim() !== '') {
          popupContent += '<br>Resource Contact: ' + contact;
        }
        
        // Bind popup with custom content to the marker
        marker.bindPopup(popupContent);
      }
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to display longitude and latitude on map click
function displayCoordinates(e) {
  var clickedPoint = e.latlng;
  var popup = L.popup()
    .setLatLng(clickedPoint)
    .setContent('Latitude: ' + clickedPoint.lat.toFixed(6) + '<br>Longitude: ' + clickedPoint.lng.toFixed(6))
    .openOn(map);
}

// Map Click
map.on('click', displayCoordinates);

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
