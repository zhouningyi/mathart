var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
var mmd = require('markdown-styles');
console.log(mmd)
var path = require('path');
var fs = require('fs');

// console.log(md);

var base = path.join(__dirname, './../');
traverPath(base);

function traverPath(base) {
  var arr = fs.readdirSync(base);
  for (var k = 0; k < arr.length; k++) {
    var name = arr[k];
    if (name === 'bin') continue;
    var base1 = path.join(base, name);
    var stat = fs.statSync(path.join(base, name));
    if (stat.isDirectory()) {
      traverPath(base1);
    } else {
      var names = name.split('.');
      var nameBefore = names[0];
      try {
        var end = names[1];
        if (end === 'md') {
          var content = fs.readFileSync(base1, 'utf8');
          console.log(999)
          console.log(mmd.render)
          var pathHtml = path.join(base, nameBefore + '.html');
          console.log(pathHtml)
          var html = mmd.render(content, pathHtml,function(e,d){
            console.log(e,d)
          });
          
          console.log(html);
          fs.writeFile(pathHtml, html, 'utf8', function() {});
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}