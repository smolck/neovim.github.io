const { testHtml, browserifyOpts, build } = require('./common') 
const browserify = require('browserify');

testHtml()
build(browserify(browserifyOpts), './test', false)
