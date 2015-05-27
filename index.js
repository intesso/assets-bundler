#!/usr/bin/env node

var command = require('./command');

// command line execution
if (!module.parent) {
  var program = require('commander');

  program
    .version(require('./package.json').version)
    .option('-s, --src [value]', 'source path')
    .option('-d, --dest [value]', 'destination path')
    .parse(process.argv);

  var opts = program.opts();
  opts.parent = 'cmd';

  return command.sync(opts);
}

// api
module.exports = command;
