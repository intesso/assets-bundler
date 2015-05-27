# assets-bundler

bundles your modules assets into application assets.

# features

 - you can use the whole [glob](https://github.com/isaacs/node-glob) syntax in the `src` and `dest` pattern, as well as the [glob-var](https://github.com/intesso/glob-var) variables starting with a colon `:`

 - for development, symbolic links are created

 - for production, the public folders of the modules are copied.



# install
```bash
npm install assets-bundler -g
```

# use

```js
var bundle = require('assets-bundler');

var opts = {
    src: __dirname + '/node_modules/:module/public',
    dest: __dirname + '/public/:module'
};

bundle(opts, function(err) {
  // all done
});

```
 -  `src` and `dest` can be absolute or relative paths.

 - when you don't provide absolute paths for `src` or `dest`, absolute paths are created from the current working directory of the process using `process.cwd()`.

# license
MIT


