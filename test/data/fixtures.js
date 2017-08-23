module.exports = {
  pages: {
    "page1.md": {
      title   : "Page 1",
      content : "Content of page 1"
    },
    "page2.md": {
      title   : "Page 2",
      content : "Content of page 2"
    }
  },

  metalsmith: {
    _metadata: {
      site: {
        title : "My Super Cool Site",
        url   : "https://example.com"
      }
    },
    _directory: __dirname
  }
}
