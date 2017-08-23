module.exports = function(page, metalsmith, done) {
  page.page1Hook = 'hooks2';
  setImmediate(done);
}
