var postcss = require('postcss');
var reduceFunctionCall = require('reduce-function-call');
var helpers = require('postcss-message-helpers');
var colorScale = require('color-scale');

module.exports = postcss.plugin('postcss-color-scale', function(opts) {
  opts = opts || {};
  var color = opts.color || 'grey';
  var variance = opts.variance || 0;
  var colors = {};

  return function(css) {
    var cs;
    var declarations = [];
    var colorKey;

    css.eachDecl(function transformDecl(decl) {
      if (!decl.value) {
        return;
      }

      if (decl.parent.selector === ':root') {
        if (decl.prop === '--cs-variance') {
          variance = decl.value;
        } else {
          colorKey = decl.prop.split('--cs-')[1];
          if (colorKey) {
            colors[colorKey] = {
              value: decl.value
            };
          }
        }
      }

      if (decl.value.indexOf('cs(') !== -1) {
        declarations.push(decl);
      }

    });

    Object.keys(colors).forEach(function(key) {
      var decl = colors[key];
      decl.func = colorScale({
        variance: variance,
        color: decl.value || color
      });
    });

    declarations.forEach(function(decl) {
      decl.value = helpers.try(function transformCS() {
        return reduceFunctionCall(decl.value, 'cs', function reduceCS(body) {
          if (!body) {
            return false;
          }
          var parts = body.split(',');
          var value = parseInt(parts[0], 10);
          // Defaults to the --cs-color variable
          var name = parts[1] ? parts[1].trim() : 'color';
          var colorObj = colors[name];
          if (!colorObj) {
            console.error('Color name ' + name + ' not defined');
            return 'cs(' + body + ')';
          }
          cs = colorObj.func;
          return cs(value);
        });
      }, decl.source);
    });

  };
});
