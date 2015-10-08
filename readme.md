# assets-bundler

bundles your assets. creates `symbolic links` for development and `copies` for production.

# features

 - you can use the whole [glob](https://github.com/isaacs/node-glob) syntax in the `src` and `dest` pattern, as well as the [glob-var](https://github.com/intesso/glob-var) variables starting with a colon `:`

 - in **development**, `symbolic links` are created, using [glob-ln](https://github.com/intesso/glob-ln)

 - in **production**, `copies` are created, using [glob-cp](https://github.com/intesso/glob-cp)


# install

```bash
npm install assets-bundler -g
```

# use

> you can either use `assets-bundler` programmatically or via command-line:

## node.js
```js
var bundle = require('assets-bundler');

var opts = {
    src: __dirname + '/node_modules/:module/public',
    dest: __dirname + '/public/:module'
};

// async version
bundle(opts, function(err) {
  // all done
});

// or with the sync version
bundle.sync(opts);
// all done

```

## command line

```bash

// use NODE_ENV for environment mode
assets-bundler --src node_modules/:module/public --dest public/assets/:module -rf

// run in 'production' mode: -> copy files and folders
assets-bundler  'node_modules/:module/public' 'public/assets/:module' -rf -e prod

// run in 'development' mode: -> symlinks
assets-bundler "node_modules/{wrap,widget,page}-*/" "lib/{wrap,widget,page}-*/" -rf -e dev

// run in 'development' mode: -> symlinks
assets-bundler --src '../glint-*' --dest 'node_modules/glint-*' -rf -e dev

```

## options

```sh
assets-bundler -h

  Usage: assets-bundler [options] ["<src>" "<dest>"]

  Please use quotes when providing '<src>' and '<dest>'

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -s, --src [value]   source path (don't forget to put it in quotes)
    -d, --dest [value]  destination path (don't forget to put it in quotes)
    -e, --env [value]   environment: "prod[uction]" or "dev[elopment]", default: "production"
    -f, --force         remove destination before the operation
    -r, --recursive     recursive copy

```

### src
- The source path. It can be relative or absolute.
- When you don't provide an absolute path, an absolute path is created from the current working directory of the process using `process.cwd()`.

### dest
- The destination path. It can be relative or absolute.
- When you don't provide an absolute path, an absolute path is created from the current working directory of the process using `process.cwd()`.

### env
- You can either set the `env` option (wins), or the environment variable `NODE_ENV` (lower precedence).

### force
- With force, assets-bundler does the job without moaning when switching the environment [production, development].
- The destiation always gets deleted before **symlinking** or **copying**, wether it is currently a link or file or folder.

### recursive
- Recursive Copy, only relevant for `procuctuion` mode. Without it, only the first level of directories gets copied over.


# test
```bash
npm test
```

# author
Andi Neck | [@andineck](https://twitter.com/andineck)

# license
MIT
