#!/usr/bin/env node

var command = require('./command');

// command line execution
if (!module.parent) {
  var program = require('commander');

  program
    .version(require('./package.json').version)
    .option('-s, --src [value]', 'source path')
    .option('-d, --dest [value]', 'destination path')
    .option('-e, --env [value]', 'environment: "production" or "development", default: "production"')
    .option('-f, --force [value]', 'remove destination before operation, default: "true"')
    .option('-r, --recursive [value]', 'recursive copy, default: "true"')
    .parse(process.argv);

  var opts = program.opts();
  opts.parent = 'cmd';

  return command.sync(opts);
}

// api
module.exports = command;
