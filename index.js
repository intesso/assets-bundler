#!/usr/bin/env node

var command = require('./command');

// command line execution
if (!module.parent) {
  var program = require('commander');

  program
    .version(require('./package.json').version)
    .usage('[options] ["<src>" "<dest>"]')
    .description('Please use quotes when providing \'<src>\' and \'<dest>\'');

  program
    .option('-s, --src [value]', 'source path (don\'t forget to put it in quotes)')
    .option('-d, --dest [value]', 'destination path (don\'t forget to put it in quotes)')
    .option('-e, --env [value]', 'environment: "prod[uction]" or "dev[elopment]", default: "production"')
    .option('-f, --force', 'remove destination before the operation')
    .option('-r, --recursive', 'recursive copy')
    .parse(process.argv);

  var opts = program.opts();
  opts._ = require('minimist')(process.argv.slice(2))._;
  opts.parent = 'cmd';

  return command.sync(opts);
}

// api
module.exports = command;
