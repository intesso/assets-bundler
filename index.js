var command = require('./command');;

// command line execution
if (!module.parent) {
  var program = require('commander');

  program
    .version(require('./package.json').version)
    .option('-s, --src [value]', 'source path')
    .option('-d, --dest [value]', 'destination path')

    .parse(process.argv);

  return command.sync(program.opts());
}

// api
module.exports = command;
