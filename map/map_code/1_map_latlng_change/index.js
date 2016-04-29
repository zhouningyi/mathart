'use strict';

var map = L.map('container', {
  'center': {
    'lat': 22.43134015636061,
    'lng': -3.33984375
  },
  'zoom': 2
});

L.tileLayer('http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png').addTo(map);

//前面的代码和之前一样，从这里开始重点
var lat, lng, latlng, circle, bounds;
for (var i = -1; i < 1; i += 0.1) {//把经度度分成20份
  for (var j = -1; j < 1; j += 0.1) {//把纬度分成20份
    lng = 180 * i;
    lat = 90 * j;
    latlng = L.latLng(lat, lng);
    bounds = [//算出 这个经纬度开始，5个经度、5个纬度范围的方形区域
      [lat, lng],
      [lat + 6, lng + 6]
    ];
    L.rectangle(bounds, {//画出来
      color: '#099',
      fillOpacity: 1,
      weight: 0
    }).addTo(map);
  }
}