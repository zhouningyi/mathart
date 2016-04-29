'use strict';
// 引入 gulp
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sftp = require('gulp-sftp'),
  watch = require('gulp-watch'),
  bulid = require('./html');

var Upload = new require('./upload');
var uploader = new Upload();

function handleError(err) {
  console.log(err.toString(), 'handleError');
  this.emit('end');
}

function watchDir(dirname) {
  var taskName = 'sftp_' + dirname;
  gulp.task(taskName, function() {
    bulid('./../' + dirname, uploader);
    return gulp.src('./../' + dirname + '/*.html')
      .pipe(sftp({
        'host': '121.40.68.211',
        'user': 'kupai',
        'pass': 'Laplace5050809338',
        'remotePath': '/home/kupai/minjin/static/blog/' + dirname + '/'
      }));
  });
  //
  gulp.run(taskName);
  //
  gulp.watch([
    './../' + dirname + '/*.md',
  ], function(e) {
    var path = e.path;
    if(path.indexOf('___web') !== -1) return;
    gulp.run(taskName);
  });
}

['particle', 'map', 'color', 'spider', 'records', 'poems'].forEach(watchDir);

gulp.task('sftp', function() {
  bulid();
  return gulp.src('./../*.html')
    .pipe(sftp({
      'host': '121.40.68.211',
      'user': 'kupai',
      'pass': 'Laplace5050809338',
      'remotePath': '/home/kupai/minjin/static/blog/'
    }));
});


// gulp.run('sftp');
// gulp.run('sftp_color');
// gulp.run('sftp_map');
// gulp.run('sftp_particle');
// gulp.run('sftp_spider');

// // 默认任务
gulp.task('default', function() {
  gulp.watch([
    './../*.md',
    './*.tpl',
  ], function(event) {
    gulp.run('sftp');
  });

  // gulp.watch([
  //   './../particle/*.md',
  // ], function(event) {
  //   gulp.run('sftp_particle');
  // });

  // gulp.watch([
  //   './../map/*.md',
  // ], function(event) {
  //   gulp.run('sftp_map');
  // });

  // gulp.watch([
  //   './../color/*.md',
  // ], function(event) {
  //   gulp.run('sftp_color');
  // });

  // gulp.watch([
  //   './../spider/*.md',
  // ], function(event) {
  //   gulp.run('sftp_spider');
  // });
});