
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./github-contributions-canvas.cjs.production.min.js')
} else {
  module.exports = require('./github-contributions-canvas.cjs.development.js')
}
