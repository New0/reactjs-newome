var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('src/images/dist/'));
});

gulp.task('styles', function(){
   var options = {
    outputStyle: 'compressed',
  };
  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass(options))
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
    .pipe(gulp.dest('src/styles/css/'))
});

gulp.task('scripts', function(){
  return gulp.src('src/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('src/js/'))
});

gulp.task('default', function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/images/**/*", ['images']);
  gulp.watch("src/js/**/*.js", ['scripts']);
});
