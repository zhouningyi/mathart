var qiniu = require('qiniu');
var path = require('path');
var fs = require('fs');


qiniu.conf.ACCESS_KEY = '5vh8rXaceIw12OYuA5sTHtQJv5XwULfMEmGjKAQA';
qiniu.conf.SECRET_KEY = 'J6SqcHNJe7FgHqnDTW0TAqjqLn4r3yeu_52dNthX';
qiniuBucket = 'open-wedding';


//调用uploadFile上传

function upload(imgurl, fileName, cb){
  var putPolicy = new qiniu.rs.PutPolicy(qiniuBucket + ":" + fileName);
  var token = putPolicy.token();
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(token, fileName, imgurl, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        var imageUrl = 'http://' + qiniuBucket + '.qiniudn.com/' + ret.key;
        cb(imageUrl);
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}


function cut(str, a, b, isAll){//从str里 切出ab之间的字符
  if(!str) return null;
  a = a || '', b = b || '';

  var ma = str.match(/\[image\]\(\.(.+)\)/);
  
  if(ma) return ma[1];
  return null;
}


function getImageURL(content){
  return cut(content, '!\[image\]\(', '\)');
}

/////////////////////////////////////////////////////

function Upload(){
  this.contents = [];
  this.index = 0;
  setTimeout(this.replace.bind(this), 500);
}

Upload.prototype = {
  isRemoteUrl: function(url){
    return url.indexOf('http') === -1;
  },
  getFileName: function(url){
    url = url.replace('.\/', '');
    return url.replace(/\//g, '-');
  },
  addContent: function(obj){
    this.contents.push(obj);
  },
  replace: function (cb) {
    var self = this;
    var obj = this.contents[this.index];
    if(this.index > this.contents.length - 1) return this.doneUpload();
    var content = obj.content;
    var imgUrl = getImageURL(content);
    //
    if(!imgUrl){
      console.log('=======', this.index + '文件夹的上传任务完成=======\n\n\n');
      this.index++;
      return setTimeout(this.replace.bind(this));
    }
    imgUrl = '.' + imgUrl;
    var url = obj.url;
    var urlStrs = url.split('\/');
    urlStrs.pop();
    var base = urlStrs.join('\/');
    var fullUrl = path.join(base, imgUrl);
    this.isImgExsit(fullUrl, url);
    //
    var fileName = this.getFileName(imgUrl);

    upload(fullUrl, fileName, function(imgUrlWeb){
      content = obj.content = content.replace(imgUrl, imgUrlWeb);
      var saveURL = url.replace('.md', '________web.md');
      fs.writeFileSync(saveURL, content, 'utf8');
      setTimeout(self.replace.bind(self));
    });
  },
  isImgExsit: function(imgurl, url){
    try {
      fs.readFileSync(imgurl);
    } catch(e) {
      console.log('\n\n\n\n', url + '的图片链接不存在：' + imgurl);
      process.exit();
    }
  },
  doneUpload:function(){
    console.log('所有上传任务完成');
  }
};

module.exports = Upload;
