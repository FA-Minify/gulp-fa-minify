import { Transform } from 'stream';
import * as through from 'through2';
import PluginError from 'plugin-error';
import { removeUnusedIcons as faMinify, IconType } from 'fa-minify';

const PLUGIN_NAME = 'gulp-fa-minify';

export function plugin(usedIcons: { [type in IconType]?: string[] }) {

  usedIcons = usedIcons || {};

  // creating a stream through which each file will pass
  const stream: Transform = through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {

      const content = file.contents.toString() as string;
      const minified = faMinify(content, { usedIcons });

      // set the fileContent
      if (minified) {
        file.contents = Buffer.from(minified);
      }
    }

    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};