const _    = require('lodash');
const async = require('async');
const fs   = require('fs');
const path = require('path');

module.exports = function(options) {
  options = _.defaults(options, {
    directory : 'hooks',
    stage     : ''
  })

  return function(pages, metalsmith, done) {
    const hooks = getHooks(metalsmith, options);

    hooks['default'](pages, metalsmith, () => {
      const pageHooks = _.without(Object.keys(hooks), 'default');
      async.each(pageHooks, (hookName, nextHook) => {
        const page = pages[hookName];
        if (!page) {
          return nextHook();
        }

        hooks[hookName](page, metalsmith, nextHook);
      }, (err) => {
        if (err) throw err;
        done();
      })
    })
  }
}

/**
 * Given the metalsmith object an the plugin options, returns an object with
 * hook functions for the given stage, keyed by page name
 *
 * @param {object} metalsmith - the metalsmith object
 * @param {object} options    - the options hash passed to the plugin
 * @returns {object} - The hooks for the given stage, keyed by page name
 */
function getHooks(metalsmith, options) {
  const appRoot = metalsmith._directory;
  const hookDir = path.resolve(appRoot, options.directory, options.stage);

  let hooks = {};
  fs.readdirSync(hookDir).forEach(f => {
    let idx = path.basename(f, '.js');
    try {
      hooks[idx] = require(`${hookDir}/${idx}`);
    } catch (e) {

    }
  })

  // if no default hook is defined, make it an async noop. This makes
  // control flow easier in the exported method.
  if (!hooks['default']) {
    hooks['default'] = function(pages, metalsmith, done) { done(); }
  }

  return hooks;
}
