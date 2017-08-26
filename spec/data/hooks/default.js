const _ = require("lodash");

module.exports = function(pages, metalsmith, done) {
  _.values(pages).forEach(p => {
    p.defaultHook = 'no stage'
  })
  done();
}
