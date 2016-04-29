'use strict';

//创建画布，每个案例都差不多
var latCenter = 22.322527221056657;
var lngCenter = 114.21292304992676;
var map = L.map('container', {
  'center': [latCenter, lngCenter],
  'zoom': 13
});

L.tileLayer('http://t.mapabc.com/maptile?t=2&x={x}&y={y}&z={z}').addTo(map);

var icon = L.icon({
  iconUrl: './images/test.png',
  iconSize: [30, 25],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

var lat, lng, latlng, marker;
var markers = [];
for (var i = 0; i < 100; i++) {
  lat = latCenter + 0.1 * (Math.random() - 0.5);
  lng = lngCenter + 0.1 * (Math.random() - 0.5);
  latlng = L.latLng(lat, lng);
  marker = L.marker(latlng).addTo(map);
  marker.setIcon(icon);
  marker.bindPopup('<p>'+ 'tag' + parseInt(Math.random() * 1000) +'</p>');
  markers.push(marker);
}

function loop(){
  for(var k = 0; k<markers.length; k++){
    var marker = markers[k];
    var latlng = marker.getLatLng();
    var latlngNew = L.latLng(latlng.lat + (Math.random() - 0.5) * 0.002, latlng.lng + (Math.random() - 0.5) * 0.002);
    markers[k].setLatLng(latlngNew);
  }
  window.requestAnimationFrame(loop);
}
loop();