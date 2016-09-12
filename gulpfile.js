/**
 * Created by g00dv1n on 12.09.16.
 */
var gulp = require('gulp');
var bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    es = require('event-stream');

var cssFiles = gulp.src('./public/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build'));


gulp.task('bower_js', function () {
   return gulp.src('./client/index.html')
       .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
       .pipe(inject(es.merge(
           cssFiles,
           gulp.src('./public/**/*.js', {read: false})
       )))
       .pipe(gulp.dest('./client'));
});



gulp.task('default', ['bower_js']);