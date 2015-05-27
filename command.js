var defaults = require('defaults');
var path = require('path');
var link = require('glob-ln');
var copy = require('glob-cp');
var error = require('debug')('glint-static:error');
var pathIsAbsolute = require('path-is-absolute');

// async
module.exports = function(opts, callback) {
  if (typeof opts == 'function') callback = opts, opts = {};
  opts = setOptions(opts);
  fixPaths(opts);

  // handle static files and folders
  var env = opts.env || process.env.NODE_ENV || 'development';
  if (env === 'production') {
    // create copies in production
    copy(opts.src, opts.dest, opts, callback);
  } else {
    // create links during development
    link(opts.src, opts.dest, opts, callback);
  }
}

//sync
module.exports.sync = function(opts) {
  opts = setOptions(opts);
  fixPaths(opts);

  // handle static files and folders
  var env = opts.env || process.env.NODE_ENV || 'development';
  if (env === 'production') {
    // create copies in production
    copy.sync(opts.src, opts.dest, opts);
  } else {
    // create links during development
    link.sync(opts.src, opts.dest, opts);
  }
}


function setOptions(opts) {
  opts = opts || {};
  return defaults(opts, {
    src: path.resolve(__dirname + '/../../node_modules/:module/public'),
    dest: path.resolve(__dirname + '/../../public/:module'),
    recursive: true
  });
}

function fixPaths(opts) {
  opts.src = getAbsolutePath(opts.src);
  opts.dest = getAbsolutePath(opts.dest);
}

function getAbsolutePath(p) {
  if (pathIsAbsolute(p)) {
    return p;
  }
  error('no absolute path:', p);
  return path.resolve(__dirname + '/../../' + p);
}
