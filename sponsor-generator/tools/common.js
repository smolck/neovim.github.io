const { dest } = require('vinyl-fs')
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const ejsify = require('ejsify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const str = require('string-to-stream');
const _ = require('lodash');

exports.browserifyOpts = _.assign({}, watchify.args, {
  entries: ['./lib/index.js'],
  transform: [ejsify],
  debug: true
});

exports.build = (bundler, dir, minify) => {
  var b = bundler.bundle()
    .on('error', (err) => console.log(`browserify error: ${err}`))
    .pipe(source('sponsors.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}));

  if (minify) {
    b = b.pipe(uglify()).on('error', (err) => console.log(`uglify error: ${err}`));
  }

  return b
    .pipe(sourcemaps.write('./'))
    .pipe(dest(dir));
}

exports.testHtml = () => {
  str([
    '<!DOCTYPE html>',
    '<html>',
    '  <body>',
    '    <div id="sponsors-test"></div>',
    '    <script>var sponsorsDivId = "sponsors-test", sponsorsFront = false;</script>',
    '    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>',
    '    <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>',
    '    <script src="sponsors.js"></script>',
    '  </body>',
    '</html>'
  ].join('\n'))
    .pipe(source('index.html'))
    .pipe(dest('./test'))
}
