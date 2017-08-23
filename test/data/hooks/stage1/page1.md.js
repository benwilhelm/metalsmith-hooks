module.exports = function(page, metalsmith, done) {
  page.page1Hook = 'stage 1';
  setImmediate(done);
}
