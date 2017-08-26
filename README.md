![travis build](https://travis-ci.org/benwilhelm/metalsmith-hooks.svg?branch=master)

[![Coverage Status](https://coveralls.io/repos/github/benwilhelm/metalsmith-hooks/badge.svg)](https://coveralls.io/github/benwilhelm/metalsmith-hooks)

# metalsmith-hooks

A metalsmith plugin for adding page-specific hooks to your build

This plugin allows you to add page-specific hooks to your metalsmith build at arbitrary points.  Think of them as per-page plugins

## Usage

First, add the `hooks` plugin to the point in your build that you'd like
to hook into. If you want to add it in multiple places, define the `stage`
option for each one.

```javascript
// index.js

metalsmith(__dirname)
.metadata({
  title: "My cool site"
})
.source('./src')            
.destination('./build')     
//...other stuff
.use(hooks({          // defines the point in the build process
  stage: 'pre-build'  // where you'd like to run your hooks
}))
.build(function(err) {      
  if (err) throw err;       
});
```

Then, in the `hooks/<stage>` directory, place a file called `<name-of-page>.js`,
where `<stage>` is the stage name of the stage you defined in the previous file,
and <name-of-page> is the index that metalsmith uses to track the page, such as
`about-us.md`.

```javascript
// hooks/pre-build/about-us.md.js

/**
 * Here you can do some processing on the individual page. Notice that the
 * function signature is very similar to a metalsmith plugin, but the first
 * argument is a single page, not the dictionary of pages.
 */
module.exports = function(page, metalsmith, done) {
  //...
}

```

## Plugin options

The `options` hash takes the following params:

* `directory` (optional) - The directory (relative to project root) in which place your hooks. Defaults to `/hooks`
* `stage` (required if using in multiple places) - An arbitrary name for the point in your build that the hooks are running. The app will look for the individual hook files in that directory. If not defined, it will look in the top level of the hooks directory.
