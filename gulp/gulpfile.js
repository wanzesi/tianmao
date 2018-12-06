var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
const babel = require('gulp-babel');
gulp.task('minijs', function() {
  // 将你的默认的任务代码放在这
  gulp.src('tianmao/app/js/a.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
})
gulp.task('hebing', function() {
    // 将你的默认的任务代码放在这
    gulp.src('tianmao/app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
  })