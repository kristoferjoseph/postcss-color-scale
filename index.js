var postcss = require('postcss');

module.exports = postcss.plugin('postcss-color-scale', function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {

        // Transform CSS AST here

    };
});
