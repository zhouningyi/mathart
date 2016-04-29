
## 投影

#### 经度和纬度
我们生活在3d的球面上，我们用经纬度描述东南西北，用海拔描述上下，地球上的物体都有经纬度信息。经纬度的学名叫地理坐标系（Geographical coordinates）。

简单地理解，经度和纬度即平面地图上的x与y轴。在投影前，经度沿着地球的极轴均等地分布，切西瓜一样地把地球分开，而纬度则是一组平行平面，横着切割地球。

![image](http://open-wedding.qiniudn.com/img-mecator.png)


#### 墨卡托变换

我们习惯的纸张和屏幕都是平面的，可地球是圆的，怎么画出来？

球面不能无损地展开为平面，因此我们发明了许多投影法(把经度和纬度转化为实际绘制的位置), 把地球表面投射到平面上，比如 [d3.js的地理投影](https://github.com/mbostock/d3/wiki/Geo-Projections) 或更详细的[arcgis网站](http://desktop.arcgis.com/zh-cn/desktop/latest/guide-books/map-projections/universal-transverse-mercator.htm)或 [维基百科](https://en.wikipedia.org/wiki/List_of_map_projections):

![image](http://open-wedding.qiniudn.com/img-projections.png)

最古老最简单最暴力的投影是plate carrée投影(Equirectangular projection), `x = lat; y = lng;`, 但误差大的惊人。

500年前，荷兰地理学家墨卡托（Mercator）发现了另一种方法，这种方法的有一种简单的理解方式：想象地球中心有一盏灯，地球外围是一层围成圆柱的纸，如果我们把灯光投影到纸上，就是地图了。按图我们得出这样的公式：`x = r * lat, y = r * tan(lng)`。

![image](http://open-wedding.qiniudn.com/img-mecator.png)

但我们容易发现，靠近南北极的地方形变很大,因此人们又进行了优化`x = r*lat, y = r*ln(tan(lng/2+pi/2))`。目前我们看到的公式，大多接近于这样。
 `ln(tan(lng/2+pi/2)) `和 `tan(lng)`相比，接近90度的时候收敛更慢一点。

墨卡托投影是不均匀的，纬度投影后比经度长，接近南北极的地方，投影后y坐标可以接近无限大，而高纬度地区人烟稀少，形变巨大，因此我们截去南北极部分，而我们希望总体投影的地图是正方形的(后面还会讲原因)。让之间的部分等于赤道的周长: -20037508.3427892,20037508.3427892,因此墨卡托投影纬度的范围为 -85.05112877980659，85.05112877980659。

#### Web Mercator(EPSG 3875)

互联网的大多数地图，都是在Web Mercator变换的基础上设计的。这玩意是google搞出来的（bing map、Mapquest等国外地图网站都用这种投影），ESRI 称其为“WGS 1984 Web 墨卡托辅助球投影”，该投影是将球面墨卡托投影公式运用于椭球面坐标的投影计算。但Web Mercator只适合可视化，不适合量测应用，因为很多特性这种投影是不具备的（当年GIS界也是很反对google的做法的, 无奈这玩意算起来毕竟方便，据说算起来速度是 Mercator 的 5 倍）。

<!-- ![image](http://open-wedding.qiniudn.com/img-expand.jpg) -->

#### 小结

因此，我们目前有几套描述位置的体系。他们之间发生着各种转换:

1、经纬度（地理坐标系）

2、空间中的实际位置

3、相对于地图画布的像素位置

![image](http://open-wedding.qiniudn.com/img-transfer.png)

这3者两两之间都有换算关系:

a、地面分辨率（Ground Resolution）一个像素(pixel)代表的地面尺寸(米)

b、地图比例尺（Map Scale）地图上的线段长度与实地相应线段长度之比

c、正投影公式 把经纬度转化为实际的位置

d、反投影公式 把实际的位置转化为经纬度





#### 中国，坐标系的烦恼

看上去简单的投影方法，到了中国却变得蛋疼， 国际上用WSG-84作为坐标系标准，可我国偏爱一种叫做GCJ-02的坐标系（俗称火星坐标系），据说是为了安全。GCJ-02和WSG-84之间的坐标系转换算法是保密的，还好n年前就有人破解了，倘若你在github上搜下GCJ-02，可以搜到好多代码。如[这个](https://github.com/mamimoluo/wgs2gcj.js/blob/master/wgs2gcj.js)， 我们可以看下核心的转换(容易发现)

```javascript
var x = wgLng - 105.0, y = wgLat - 35.0;
 function transformLat(x, y) {
    ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * this.pi) + 40.0 * Math.sin(y / 3.0 * this.pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * this.pi) + 320 * Math.sin(y * this.pi / 30.0)) * 2.0 / 3.0;
    return ret;
  }
function transformLon(x, y) {
    ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * this.pi) + 40.0 * Math.sin(x / 3.0 * this.pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * this.pi) + 300.0 * Math.sin(x / 30.0 * this.pi)) * 2.0 / 3.0;
    return ret;
  }
```

有趣的是火星坐标的第一行，var x = wgLng - 105.0, y = wgLat - 35.0; 被减掉的值是经度105,纬度35,这是什么鬼？查出来这个是兰州南部的一个无名村庄。此刻俺思维联通了，想起初中地理老师说兰州是中国的几何中心，所以以此为中心，是为让经纬度变化造成的误差在中国的误差小一点。感觉吐槽结束后有那么点淡淡地的欣慰。

可故事还没有结束，国内有一家公司叫百度，他们发明了一种叫做BD-09/BD-09II的坐标系，百度的坐标系在GCJ-02的基础上又进行了一次转换。还好大神也破解了，事实上，百度对GCJ84的转换，只是短短的几行。

```javascript
function BD092GCJ (lat, lng) {
  var constp = Math.PI * 3000.0 / 180.0;
  var x = parseFloat(lng) - 0.0065;
  var y = parseFloat(lat) - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * constp);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * constp);
  return {
    'lat': parseFloat((z * Math.sin(theta)).toFixed(5), 10),
    'lng': parseFloat((z * Math.cos(theta)).toFixed(5), 10)
  };
}
```
据说这些公式是大神们拿着matlab拟合出来的结果，嘿嘿，哥在此跪谢10000遍！

此外，Google声明中国街道地图的提供商是 MapABC（北京图盟科技有限公司, 其实算是高德的），Google 公司未对地图作过任何变换。


#### 动手验证

墨卡托变换是个非线性变换，即经纬度均匀变化的时候，地图上的位置不均匀变化，反之亦然。也就是，如果我们在地球上走了最近的距离，在平面地图上往往是个弧线。这个事情有悖于我们的常识，<!--比如出差从北京飞到德国，却经过了西伯利亚上空。好不容易才想明白，原来不是飞机走了弯路，而是地图上直线不是最近距离。-->我们拿leaflet验证一下。


![image](http://open-wedding.qiniudn.com/map_code-1_map_latlng_change2-path.png)

经纬度的形变本身也是不均匀的，我们用leaflet做个验证:
```javascript
//前面的代码和之前一样，从这里开始
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
```
容易发现，比如纬度越高，形变越大（一个纬度跨越的距离越大）。对于物理距离也是如此，有一个经验公式:
`
1纬度 = 110.94km = 6,371,000*1/360*2*PI
1经度 = 110.94km*cos(纬度) = 6,371,000*1/360*2*PI
`

![image](http://open-wedding.qiniudn.com/map_code-1_map_latlng_change-path.png)

