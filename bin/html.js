var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var hljs = require('highlight');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  langPrefix:   'language-javascript',
  typographer: true,
  // highlight: function(str, lang) {
  //   // if(lang === 'js') lang = 'javascript';
  //     // if (lang && hljs.getLanguage(lang)) {
  //       try {
  //         console.log(str, hljs.highlight(lang, str));
  //         // return hljs.highlight(lang, str).value;
  //       } catch (e) {}
  //     try {
  //        console.log(hljs.highlightAuto(str).value);
  //       return hljs.highlightAuto(str).value;
  //     } catch (e) {}
  //     return ''; // use external default escaping
  //   }
});

var tplGithub = fs.readFileSync(path.join(__dirname, './github.tpl'), 'utf8');




function Build(dir, uploader) {
  dir = dir || './../';
  var base = path.join(__dirname, dir);
  traverPath(base, uploader);
}

var namemap = {
  'index': '前言',
  '1_particle_physic': '物理粒子',
  '1_map_basic': '地图与投影',
  '1_color_basic': '色彩基础',
  '2_color_palette': '色彩组合之道',
};

function traverPath(base, uploader) {
  var arr = fs.readdirSync(base);
  for (var k = 0; k < arr.length; k++) {
    var name = arr[k];
    if (name === 'bin') continue;
    var base1 = path.join(base, name);
    var stat = fs.statSync(path.join(base, name));
    if (stat.isDirectory()) {
      traverPath(base1, uploader);
    } else {
      var names = name.split('.');
      var nameBefore = names[0];
      try {
        var end = names[1];
        if (end === 'md' && name.indexOf('_web.md') === -1) {
          var content = fs.readFileSync(base1, 'utf8');
          var article = md2article(content);
          var url = getUrl(base1);
          var html = render(namemap[nameBefore] || nameBefore, article, url);
          var pathHtml = path.join(base, nameBefore + '.html');
          uploader.addContent({
            content: content,
            url: base1
          });
          fs.writeFile(pathHtml, html, 'utf8', function() {});
        }
      } catch (e) {}
    }
  }
}


function getUrl (base){
  return 'http://hotu.co/blog'+ base.split('mathart')[1].split('.')[0] + '.html';
}

/**
 * md2article 把markdown渲染成html
 */
function md2article(content) {
  return md.render(content);
}

/**
 * render 完整的html
 */
function render(title, article, shareUrl) {
  console.log(shareUrl);
  var compiled = _.template(tplGithub);
  return compiled({
    'title': title,
    'markdown': article,
    'shareUrl': 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx05125e8c1635642f&redirect_uri='+ shareUrl +'?response_type=code&scope=snsapi_base&state=22&connect_redirect=1&from=timeline&isappinstalled=0#wechat_redirect'
  });
}
module.exports = Build;