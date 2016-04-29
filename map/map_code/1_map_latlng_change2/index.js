'use strict';

var map = L.map('container', {
  'center': {
    'lat': 22.43134015636061,
    'lng': -3.33984375
  },
  'zoom': 2
});

L.tileLayer('http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png').addTo(map);

var lat0 = 30, lng0 = 100, lat, lng, latlngs = [];
for(var k = 0; k < 50; k++){
  lat = lat0 + 1 * k;
  lng = lng0 - 2 * k;
  latlngs.push(L.latLng(lat, lng));
}

var polyline = L.polyline(latlngs, {
  'weight': 10,
  'color': '#099',
  'opacity': 0.9
}).addTo(map);