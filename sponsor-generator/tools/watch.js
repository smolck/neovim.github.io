const { testHtml, browserifyOpts, build } = require('./common') 
const watchify = require('watchify');
const browserify = require('browserify');

testHtml()
const bundler = watchify(browserify(browserifyOpts), './test')
bundler.on('update', function() { build(bundler, './test', false); })
bundler.on('log', (...args) => console.log('browserify:', ...args))
build(bundler, './test')
