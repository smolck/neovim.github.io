const { browserifyOpts, build } = require('./common') 
const browserify = require('browserify')

const opts = browserifyOpts
opts.debug = false
build(browserify(opts), '../js', true)
