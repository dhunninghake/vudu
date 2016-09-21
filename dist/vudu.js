'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _typeof = _interopDefault(require('babel-runtime/helpers/typeof'));
var _Object$keys = _interopDefault(require('babel-runtime/core-js/object/keys'));
var prefixer = _interopDefault(require('inline-style-prefixer/static'));
var _classCallCheck = _interopDefault(require('babel-runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('babel-runtime/helpers/createClass'));

var camelToHyphen = function camelToHyphen(c) {
  return c.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

var guid = function guid() {
  return Math.random().toString(26).substring(2, 10) + Math.random().toString(26).substring(2, 10);
};

var deepEqual = function deepEqual(a, b) {
  var isAobj = (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object';
  var isBobj = (typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object';
  var isABobjs = isAobj && isBobj;
  var out = a === b;

  function checkX(x) {
    var ix = void 0,
        res = void 0;
    for (ix in x) {
      if (x.hasOwnProperty(ix)) {
        res = deepEqual(a[ix], b[ix]);
      }
      if (!res) {
        break;
      }
    }
    return res;
  }
  if (a && b && isABobjs && !out) {
    out = checkX(a) && checkX(b);
  }
  return out;
};

var Cache = function () {
  function Cache() {
    _classCallCheck(this, Cache);

    this.items = [];
  }

  _createClass(Cache, [{
    key: "addItem",
    value: function addItem(item) {
      this.items.push(item);
    }
  }, {
    key: "clearItems",
    value: function clearItems() {
      this.items = [];
    }
  }]);

  return Cache;
}();

var Sheet = function () {
  function Sheet() {
    _classCallCheck(this, Sheet);

    this.vStyleSheet = this.create('vStyleSheet');
  }

  _createClass(Sheet, [{
    key: 'create',
    value: function create(id) {
      if (document.getElementById(id)) {
        return;
      } else {
        var style = document.createElement('style');
        style.appendChild(document.createTextNode(''));
        style.setAttribute('id', id);
        document.head.appendChild(style);
        return style.sheet;
      }
    }
  }, {
    key: 'reset',
    value: function reset() {
      var _this = this;

      this.stylesheet.cssRules.forEach(function (item, index) {
        _this.stylesheet.deleteRule(index);
      });
    }
  }]);

  return Sheet;
}();

var cache = new Cache();
var sheet = new Sheet();

var vStyleSheet = sheet.vStyleSheet;


var prefix = function prefix(prop, vendors) {
  var flattened = '';
  vendors.forEach(function (v) {
    return flattened = flattened.concat(camelToHyphen(prop) + ': ' + v + ';');
  });

  return flattened;
};

var buildDeclarations = function buildDeclarations() {
  var styles = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var declarations = '';
  _Object$keys(styles).forEach(function (s) {
    if (_typeof(styles[s]) !== 'object') {
      var needsPrefix = /[A-Z]/.test(s[0]);
      var cssProperty = needsPrefix ? '-' + camelToHyphen(s) : camelToHyphen(s);
      var declaration = cssProperty + ': ' + styles[s] + ';';
      declarations = declarations.concat(declaration);
    }

    // sometimes a property has an array of values
    // e.g. display: [-webkit-box, -ms-flexbox, etc.]
    // this little bit flattens out those values
    if (Array.isArray(styles[s])) {
      console.log(styles[s]);
      declarations = declarations.concat(prefix(s, styles[s]));
    }
  });

  return declarations;
};

var buildFontface = function buildFontface() {
  var styles = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var declarations = '';
  _Object$keys(styles).forEach(function (s) {
    if (!Array.isArray(styles[s])) {
      declarations = declarations.concat(camelToHyphen(s) + ': ' + styles[s] + ';');
    } else {
      (function () {
        var sourceDecs = 'src: ';
        styles[s].forEach(function (source, index) {
          if (source.format === 'embedded-opentype') {
            var line = 'url(' + source.path + '?#iefix) format(\'' + source.format + '\'),';
            sourceDecs = 'src: url(' + source.path + '); ' + sourceDecs;
            sourceDecs = sourceDecs.concat(line);
          } else {
            var comma = index < styles[s].length - 1 ? ',' : '';
            var _line = 'url(' + source.path + ') format(\'' + source.format + '\')' + comma;
            sourceDecs = sourceDecs.concat(_line);
          }
        });
        sourceDecs = sourceDecs.concat(';');
        declarations = declarations.concat(sourceDecs);
      })();
    }
  });

  return declarations;
};

var buildKeyframes = function buildKeyframes() {
  var keyframe = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var keyframes = '';
  _Object$keys(keyframe).forEach(function (kf) {
    var declarations = buildDeclarations(keyframe[kf]);
    keyframes = keyframes.concat(kf + ' { ' + declarations + ' }\n');
  });

  return keyframes;
};

var buildRuleset = function buildRuleset(element, customSheet) {
  var stylesheet = customSheet ? customSheet : vStyleSheet;
  var className = guid();
  var classes = {};

  _Object$keys(element).forEach(function (k) {
    var newClassName = k + '-' + className;
    var styles = element[k];
    var prefixed = prefixer(styles);

    // build base level styles (strings)
    var declarations = buildDeclarations(prefixed);
    if (declarations.length > 0) {
      var rule = '.' + newClassName + ' { ' + declarations + ' }';
      stylesheet.insertRule(rule, stylesheet.cssRules.length);
    }

    // handle special cases (objects)
    _Object$keys(styles).forEach(function (s) {
      if (_typeof(styles[s]) === 'object') {
        var _declarations = buildDeclarations(styles[s]);
        if (s.startsWith('@media')) {
          var _rule = s + ' { .' + newClassName + ' { ' + _declarations + ' } }';
          stylesheet.insertRule(_rule, stylesheet.cssRules.length);
        } else if (s.startsWith(':')) {
          var _rule2 = '.' + newClassName + s + ' { ' + _declarations + ' }';
          stylesheet.insertRule(_rule2, stylesheet.cssRules.length);
        } else if (s.startsWith('@keyframes')) {
          var _rule3 = s + ' {\n ' + buildKeyframes(styles[s]) + ' \n}';
          stylesheet.insertRule(_rule3, stylesheet.cssRules.length);
        } else if (s.startsWith('@font-face')) {
          var _rule4 = s + ' { ' + buildFontface(styles[s]) + ' }';
          stylesheet.insertRule(_rule4, stylesheet.cssRules.length);
        } else {
          var _rule5 = '.' + newClassName + ' ' + s + ' { ' + _declarations + ' }';
          stylesheet.insertRule(_rule5, stylesheet.cssRules.length);
        }
      }
    });

    classes[k] = newClassName;
  });

  return classes;
};

var vFunction = function vFunction(el, customSheet) {
  // return cached styles
  for (var i = 0; i < cache.items.length; i++) {
    if (deepEqual(cache.items[i].element, el)) {
      return cache.items[i].classes;
    }
  }

  // otherwise create new ones!
  var cacheItem = {};
  var classes = buildRuleset(el, customSheet);

  cacheItem.element = el;
  cacheItem.classes = classes;
  cache.addItem(cacheItem);

  return classes;
};

var v = vFunction;

exports.cache = cache;
exports.sheet = sheet;
exports.v = v;
exports['default'] = vFunction;
