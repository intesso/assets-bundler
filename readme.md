# assets-bundler

bundles your assets. creates symbolic links for development and copies for production.

# features

 - you can use the whole [glob](https://github.com/isaacs/node-glob) syntax in the `src` and `dest` pattern, as well as the [glob-var](https://github.com/intesso/glob-var) variables starting with a colon `:`

 - for development, symbolic links are created, using [glob-ln](https://github.com/intesso/glob-ln)

 - for production, the public folders of the modules are copied, using [glob-cp](https://github.com/intesso/glob-cp)


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
assets-bundler --src node_modules/:module/public --dest public/assets/:module
```

## options

### src
- The source path. It can be relative or absolute.
- When you don't provide an absolute path, an absolute path is created from the current working directory of the process using `process.cwd()`.

### dest
- The destination path. It can be relative or absolute.
- When you don't provide an absolute path, an absolute path is created from the current working directory of the process using `process.cwd()`.

### env
- you can either set the `env` option or the environment variable `NODE_ENV`
- values: `production`, `development`
- default: `production`

# test
```bash
npm test
```

# author
Andi Neck | [@andineck](https://twitter.com/andineck)

# license
MIT


