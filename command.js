#!/usr/bin/env node

/*
 * module dependencies
 */
var defaults = require('defaults');
var path = require('path');
var link = require('glob-ln');
var copy = require('glob-cp');
var debug = require('debug')('assets-bundler:debug');
var pathIsAbsolute = require('path-is-absolute');

/*
 * default variables
 */
var defaultEnv = 'production';

/*
 * api functions
 */
// async
module.exports = function(opts, callback) {
  if (typeof opts == 'function') callback = opts, opts = {};
  opts = setOptions(opts);
  fixPaths(opts);

  // handle static files and folders
  if (opts.env === 'production') {
    // create copies in production
    copy(opts.src, opts.dest, opts, callback);
  } else {
    // create links during development
    link(opts.src, opts.dest, opts, callback);
  }
};

//sync
module.exports.sync = function(opts) {
  opts = setOptions(opts);
  fixPaths(opts);

  // handle static files and folders
  if (opts.env === 'production') {
    // create copies in production
    copy.sync(opts.src, opts.dest, opts);
  } else {
    // create links during development
    link.sync(opts.src, opts.dest, opts);
  }
};

/*
 * private helper functions
 */
function setOptions(opts) {
  opts = opts || {};

  if ((!opts.src || !opts.dest) && opts._.length < 2) {
    var msg = 'please let me know your "src" and "dest" path. \n--> run "assets-bundler -h" for more info.';
    console.error(msg);
    if (opts.parent === 'cmd') process.exit(1);
  }

  if (!opts.src && opts._.length >= 2) opts.src = opts._[0];
  if (!opts.dest && opts._.length >= 2) opts.dest = opts._[1];

  opts.env = opts.env || process.env.NODE_ENV || defaultEnv;
  if (opts.env === 'dev') opts.env = 'development';
  if (opts.env === 'prod') opts.env = 'production';

  debug('options', opts);
  return opts;
}

function fixPaths(opts) {
  opts.src = getAbsolutePath(opts.src, 'src');
  opts.dest = getAbsolutePath(opts.dest, 'dest');

  function getAbsolutePath(p, description) {
    if (pathIsAbsolute(p)) {
      return p;
    }

    var absolute = path.resolve(process.cwd() + '/' + p);
    debug('no absolute path provided, ' + description + ' set to: ' + absolute);
    return absolute;
  }
}
