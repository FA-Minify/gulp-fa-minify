const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const faMinify = require('gulp-fa-minify');

gulp.task('default', () => {

  const usedIcons = {
    fas: ['copy', 'gears', 'address-book'],
    fal: ['gears'],
    far: ['copy'],
    fab: ['twitch']
  };

  // we copy the default all.js file into the current folder just for comparison
  gulp.src('./all.js')
    .pipe(rename('all.src.js'))
    .pipe(gulp.dest('./'));


  return gulp.src('./all.js')
    .pipe(rename('all.fa-min.js'))
    .pipe(faMinify(usedIcons))
    .pipe(uglify())
    .pipe(gulp.dest('./'));

});