# assets-bundler

bundles your modules assets into application assets.

## for development, symbolic links are created

## for production, the public folders of the modules are copied.

# install
```bash
npm install assets-bundler -g
```

# use

```js
var bundle = require('assets-bundler');


var src = __dirname + '/node_modules/:module/public';
var dest = __dirname + '/public/:module';

var opts = {
src: src,
dest: dest
};

bundle(opts, function(err) {
  // all done
});

```


# license
MIT


