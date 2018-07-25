const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const faMinify = require('gulp-fa-minify');


gulp.task('default', () => {

  const usedIcons = {
    fal: [],
    far: ['copy'],
    fas: ['copy', 'cogs', 'address-book'],
    fab: []
  };

  // we copy the default all.js file into the current folder just for comparison
  gulp.src('./node_modules/@fortawesome/fontawesome-free/js/all.js')
    .pipe(rename('all.src.js'))
    .pipe(gulp.dest('./'));


  return gulp.src('./node_modules/@fortawesome/fontawesome-free/js/all.js')
    .pipe(rename('all.fa-min.js'))
    .pipe(faMinify(usedIcons))
    .pipe(uglify())
    .pipe(gulp.dest('./'));

});