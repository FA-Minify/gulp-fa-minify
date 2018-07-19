const through = require('through2');

const PLUGIN_NAME = 'gulp-fa-minify';

module.exports = function (usedIcons) {

  usedIcons = usedIcons || {};

  // creating a stream through which each file will pass
  const stream = through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {

      let content = file.contents.toString();

      // fontawesoms all.js consists of n+1 functions where n=number of different icon styles (far,fas,fal,fab)
      content = content.replace(/(\(function\s*\(\)\s*\{[\s\S.]*?}\(\)\);)/gim, function () {
        const func = arguments[1];

        // get the type ('far'/'fas'/'fal'/'fab') from function
        const matches = /\('(fa.)',/gi.exec(arguments[1]) || [];
        const type = matches[1];

        // no type means this function is the bootstrap function
        // keep it
        if (!type) {
          return func;
        }

        if (usedIcons[type] && usedIcons[type].length > 0) {
          // we use some icons from this type so we keep this function
          return func;
        }

        // no icons used from this type so remove the function
        return '';
      });

      // we search for the icons object, parse it and remove unused icons
      content = content.replace(/(var\s+icons\s*=)([\s\S.]*?)(;[\s\S.]*?define\('(fa.)', icons\);)/gmi, function () {
        const icons = arguments[2];
        const type = arguments[4];

        // parse the icons object read from the file content
        let iconObject = null;
        try {
          iconObject = JSON.parse(icons)
        } catch (e) {
          iconObject = {};
        }
        
        console.info('type:' + type + ' iconObject: ', iconObject);

        // keep usedIcons and remove every other icon
        if (usedIcons[type]) {
          Object.keys(iconObject).forEach(key => {
            if (!usedIcons[type].includes(key)) {
              delete iconObject[key];
            }
          });
        }


        // return the code without unused icons
        return arguments[1] + JSON.stringify(iconObject) + arguments[3];
      });

      // set the fileContent
      file.contents = Buffer.from(content);
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};