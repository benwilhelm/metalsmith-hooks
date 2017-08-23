module.exports = function(page, metalsmith, done) {
  page.page1Hook = 'no stage';
  setImmediate(done);
}
