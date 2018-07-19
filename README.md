## FA-Minify

A utility Gulp plugin to remove unused Icons from [FontAwesome 5](https://fontawesome.com/) when using [SVG with JavaScript](https://fontawesome.com/how-to-use/on-the-web/setup/hosting-font-awesome-yourself#using-svgs).

The `all.js` or `all.min.js` files can lead to a bundle size increase of ~900kb.
Only including the needed Icons can lead to a massive size reduction and performance increase.

Use it as a normal gulp plugin in your workflow:
```javascript
  const usedIcons = {
    fal: [],
    far: ['copy'],
    fas: ['copy', 'cogs', 'address-book'],
    fab: []
  };

  return gulp.src('./path/to/font-awesome/all.js')
    .pipe(rename('all.cleared.js'))
    .pipe(faMinify(usedIcons))
    .pipe(gulp.dest('./'));
```
(see: https://github.com/NetWin/fa-minify/blob/master/test/gulpfile.js)

    
    
    
**Attention:** Only works with the all.js file because this plugin uses regular expressions to find the defined icons. The minfied / mangled file makes this very hard
