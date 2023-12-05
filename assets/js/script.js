var map = L.map('map').setView([18.2, 66.5], 1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTuYq4O9hSnJhYTob1RLkWE_3QN_REwf5N1z3-gp4yfldD2MLe5GKDEiCr6yKgMOnUDpTLdFgm4VkVG/pub?output=csv';

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


