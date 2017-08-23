module.exports = function(page, metalsmith, done) {
  setImmediate(done);
  page.page2Hook = 'hooks2';
}
