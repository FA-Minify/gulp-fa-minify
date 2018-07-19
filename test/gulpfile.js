const gulp = require('gulp');
const rename = require('gulp-rename');
const jsMinify = require('gulp-minify');

const faMinify = require('../index');


gulp.task('default', () => {

  const usedIcons = {
    fal: [],
    far: ['copy'],
    fas: ['copy', 'cogs', 'address-book'],
    fab: []
  };

  return gulp.src('./all.js')
    .pipe(rename('all.cleared.js'))
    .pipe(faMinify(usedIcons))
    .pipe(jsMinify({ ext: { min: '.min.js' }, noSource: true }))
    .pipe(gulp.dest('./'));

});