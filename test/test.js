var test = require('tape');
var fs = require('fs');
var st = require('../index');
var rm = require('rimraf');
var path = require('path');

test('link directory async', function(t) {

  cleanup();

  process.env.NODE_ENV = undefined;

  var src = __dirname + '/node_modules/:module/public';
  var dest = __dirname + '/public/:module';

  var opts = {
    src: src,
    dest: dest
  };

  st(opts, function(err) {

    t.ok(!err);
    t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/test_pub/css/bundle.css'));
    t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/Irish-Pub/css/bundle.css'));

    t.end(err);
  });

});

test('copy directory async', function(t) {

  cleanup();

  process.env.NODE_ENV = 'production';

  var src = __dirname + '/node_modules/:module/public';
  var dest = __dirname + '/public/:module';

  var opts = {
    src: src,
    dest: dest
  };

  st(opts, function(err) {

    t.ok(!err);
    t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/test_pub/css/bundle.css'));
    t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/Irish-Pub/css/bundle.css'));

    t.end(err);
  });

});

test('link files async', function(t) {

  cleanup();

  process.env.NODE_ENV = 'development';

  var src = __dirname + '/node_modules/:module/public/**/*.*';
  var dest = __dirname + '/public/:module/**/*.*';

  var opts = {
    src: src,
    dest: dest
  };

  st(opts, function(err) {

    t.ok(!err);
    t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/test_pub/css/bundle.css'));
    t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));
    t.ok(exists(__dirname + '/public/Irish-Pub/css/bundle.css'));

    t.end(err);
  });

});

test('link directories sync', function(t) {

  cleanup();

  process.env.NODE_ENV = 'development';

  var src = __dirname + '/node_modules/:module/public';
  var dest = __dirname + '/public/:module';

  var opts = {
    src: src,
    dest: dest
  };

  st.sync(opts);

  t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
  t.ok(exists(__dirname + '/public/test_pub/css/bundle.css'));
  t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));
  t.ok(exists(__dirname + '/public/Irish-Pub/css/bundle.css'));

  t.end();

});

test('copy directories sync', function(t) {

  cleanup();

  process.env.NODE_ENV = 'production';

  var src = __dirname + '/node_modules/:module/public';
  var dest = __dirname + '/public/:module';

  var opts = {
    src: src,
    dest: dest
  };

  st.sync(opts);

  t.ok(exists(__dirname + '/public/test_pub/js/bundle.js'));
  t.ok(exists(__dirname + '/public/test_pub/css/bundle.css'));
  t.ok(exists(__dirname + '/public/Irish-Pub/js/bundle.js'));
  t.ok(exists(__dirname + '/public/Irish-Pub/css/bundle.css'));

  t.end();

});


function cleanup() {
  rm.sync(__dirname + '/public');
}

function exists(p) {
  try {
    var fd = fs.openSync(p, 'r');
    return !!fd;
  } catch (err) {
    return false;
  }
}
