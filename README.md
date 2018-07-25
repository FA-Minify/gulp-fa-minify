### FA-Minify

A utility Gulp plugin to remove unused Icons from [FontAwesome 5](https://fontawesome.com/) when using [SVG with JavaScript](https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself#using-svgs).

The JavaScript files included in FontAwesome 5 can lead to a bundle size increase of ~900kb (or even >2.5MB if you have Access to the Pro Version). Only including the needed Icons can lead to a massive size reduction and performance increase.

Use it as a normal gulp plugin in your workflow:
```javascript
  const usedIcons = {
    fal: [],
    far: ['copy'],
    fas: ['copy', 'cogs', 'address-book'],
    fab: []
  };

  return gulp.src('./path/to/font-awesome/all.js')
    .pipe(faMinify(usedIcons))
    .pipe(gulp.dest('./'));
```
(Full Example: [gulpfile.js](https://github.com/NetWin/fa-minify/blob/master/example/gulpfile.js) )    
    
    
**Attention:** Only works with the non minified JavaScript files because this plugin uses regular expressions to find the defined icons. 
The minified / mangled files makes this very hard. But adding the [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) for example is a simple one-liner.
