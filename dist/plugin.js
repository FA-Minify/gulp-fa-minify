"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const through = require("through2");
const PluginError = require("plugin-error");
const fa_minify_1 = require("fa-minify");
const PLUGIN_NAME = 'gulp-fa-minify';
function plugin(usedIcons) {
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
            const content = file.contents.toString();
            const minified = fa_minify_1.removeUnusedIcons(content, { usedIcons });
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
}
exports.plugin = plugin;
;
