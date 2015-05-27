# assets-bundler

bundles your modules assets into application assets.

 > for development, symbolic links are created

 > for production, the public folders of the modules are copied.

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

# license
MIT


