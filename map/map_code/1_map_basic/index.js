//创建画布，每个案例都差不多
var map = L.map('container', {
  'center': [22.322527221056657, 114.21292304992676],
  'zoom': 13
});
L.tileLayer('http://t.mapabc.com/maptile?t=2&x={x}&y={y}&z={z}').addTo(map);

map.on('moveend zoomend', function() {
  console.log(JSON.stringify({
    center: map.getCenter(),
    zoom: map.getZoom()
  }));
});