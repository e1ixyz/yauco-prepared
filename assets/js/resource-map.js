// Initialize Leaflet Map
var map = L.map('map').setView([18.2, 66.5], 1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to handle getting coordinates from address
function getCoordinatesFromAddress() {
  var address = document.getElementById('addressInput').value;

  // Using Leaflet's control Geocoder to convert address to coordinates
  var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
  })
    .on('markgeocode', function (e) {
      var latlng = e.geocode.center;
      alert('Coordinates for ' + address + ': ' + latlng.lat + ', ' + latlng.lng);
    })
    .addTo(map);

  geocoder.geocode(address);
}

// Attach the getCoordinatesFromAddress function to the button click event
document.getElementById('getCoordinatesBtn').addEventListener('click', getCoordinatesFromAddress);

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

// Map Click
map.on('click', function(e) {
  var clickedPoint = e.latlng;
  alert('Clicked coordinates: ' + clickedPoint.lat + ', ' + clickedPoint.lng);
});
