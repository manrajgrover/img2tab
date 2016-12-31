const gulp = require('gulp');
const browserify = require("browserify");
const babelify = require("babelify");
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const babel = require('gulp-babel');


gulp.task('browser', () => {
  browserify({ debug: false })
    .transform(babelify)
    .require("./sample/example.js", { entry: true })
    .bundle()
    .on('error',gutil.log)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./sample/source'));
});

gulp.task('es6', () => {
  gulp.src('src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', () => {
  gulp.watch(['./src/*.js'],['browser', 'es6'])
});
 
gulp.task('default', ['browser', 'es6']);
