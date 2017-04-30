var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
  console.log('Default gulp task.');
});

gulp.task('html', function() {
  console.log('html task run');
});

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });
  watch('./app/index.html', function() {
    browserSync.reload();
  });
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
});

// first run postcss on css files, then inject the compiled css into our html
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});
