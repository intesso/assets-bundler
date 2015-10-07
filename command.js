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
  return defaults(opts, {
    src: 'node_modules/:module/public',
    dest: 'public/:module',
    env: opts.env || process.env.NODE_ENV || defaultEnv,
    recursive: true,
    force: true
  });
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


