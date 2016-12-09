var gulp = require('gulp'),
//    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps');
//    webserver = require('gulp-webserver');

var config = {
    dev_mode : true
};

var sass_config = {
    sourcemap:true,
    style: config.dev_mode ? 'expanded' : 'compressed'
};

gulp.task('layout',  function () {
    return sass('frontend/layout.scss', sass_config)
        .on('error', function (err) {
            console.error('Error: ', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../frontend/css'));
});
gulp.task('widget', function(){
    return sass('frontend/widget.scss', sass_config)
        .on('error', function(err){
            console.error('Error: ', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../frontend/css'));
});

gulp.task('batch',['layout', 'widget']);

gulp.task('watch', function() {
  gulp.watch('frontend/**/*', ['batch']);
});