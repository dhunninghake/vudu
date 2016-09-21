'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var prefixProps = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = { "Webkit": { "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "backfaceVisibility": true, "perspective": true, "perspectiveOrigin": true, "transformStyle": true, "transformOriginZ": true, "animation": true, "animationDelay": true, "animationDirection": true, "animationFillMode": true, "animationDuration": true, "animationIterationCount": true, "animationName": true, "animationPlayState": true, "animationTimingFunction": true, "appearance": true, "userSelect": true, "fontKerning": true, "textEmphasisPosition": true, "textEmphasis": true, "textEmphasisStyle": true, "textEmphasisColor": true, "boxDecorationBreak": true, "clipPath": true, "maskImage": true, "maskMode": true, "maskRepeat": true, "maskPosition": true, "maskClip": true, "maskOrigin": true, "maskSize": true, "maskComposite": true, "mask": true, "maskBorderSource": true, "maskBorderMode": true, "maskBorderSlice": true, "maskBorderWidth": true, "maskBorderOutset": true, "maskBorderRepeat": true, "maskBorder": true, "maskType": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "filter": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true, "flex": true, "flexBasis": true, "flexDirection": true, "flexGrow": true, "flexFlow": true, "flexShrink": true, "flexWrap": true, "alignContent": true, "alignItems": true, "alignSelf": true, "justifyContent": true, "order": true, "transition": true, "transitionDelay": true, "transitionDuration": true, "transitionProperty": true, "transitionTimingFunction": true, "backdropFilter": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "shapeImageThreshold": true, "shapeImageMargin": true, "shapeImageOutside": true, "hyphens": true, "flowInto": true, "flowFrom": true, "regionFragment": true, "textSizeAdjust": true }, "Moz": { "appearance": true, "userSelect": true, "boxSizing": true, "textAlignLast": true, "textDecorationStyle": true, "textDecorationSkip": true, "textDecorationLine": true, "textDecorationColor": true, "tabSize": true, "hyphens": true, "fontFeatureSettings": true, "breakAfter": true, "breakBefore": true, "breakInside": true, "columnCount": true, "columnFill": true, "columnGap": true, "columnRule": true, "columnRuleColor": true, "columnRuleStyle": true, "columnRuleWidth": true, "columns": true, "columnSpan": true, "columnWidth": true }, "ms": { "flex": true, "flexBasis": false, "flexDirection": true, "flexGrow": false, "flexFlow": true, "flexShrink": false, "flexWrap": true, "alignContent": false, "alignItems": false, "alignSelf": false, "justifyContent": false, "order": false, "transform": true, "transformOrigin": true, "transformOriginX": true, "transformOriginY": true, "userSelect": true, "wrapFlow": true, "wrapThrough": true, "wrapMargin": true, "scrollSnapType": true, "scrollSnapPointsX": true, "scrollSnapPointsY": true, "scrollSnapDestination": true, "scrollSnapCoordinate": true, "touchAction": true, "hyphens": true, "flowInto": true, "flowFrom": true, "breakBefore": true, "breakAfter": true, "breakInside": true, "regionFragment": true, "gridTemplateColumns": true, "gridTemplateRows": true, "gridTemplateAreas": true, "gridTemplate": true, "gridAutoColumns": true, "gridAutoRows": true, "gridAutoFlow": true, "grid": true, "gridRowStart": true, "gridColumnStart": true, "gridRowEnd": true, "gridRow": true, "gridColumn": true, "gridColumnEnd": true, "gridColumnGap": true, "gridRowGap": true, "gridArea": true, "gridGap": true, "textSizeAdjust": true } };
module.exports = exports["default"];
});

var capitalizeString = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// helper to capitalize strings

exports.default = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports = exports["default"];
});

var joinPrefixedValue = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

// returns a style object with a single concated prefixed value string

exports.default = function (property, value) {
  var replacer = arguments.length <= 2 || arguments[2] === undefined ? function (prefix, value) {
    return prefix + value;
  } : arguments[2];
  return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function (prefix) {
    return replacer(prefix, value);
  }));
};

module.exports = exports['default'];
});

var isPrefixedValue = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (value) {
  if (Array.isArray(value)) value = value.join(',');

  return value.match(/-webkit-|-moz-|-ms-/) !== null;
};

module.exports = exports['default'];
});

var calc_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calc;

var _joinPrefixedValue = joinPrefixedValue;

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

var _isPrefixedValue = isPrefixedValue;

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function calc(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
    return (0, _joinPrefixedValue2.default)(property, value, function (prefix, value) {
      return value.replace(/calc\(/g, prefix + 'calc(');
    });
  }
}
module.exports = exports['default'];
});

var cursor_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cursor;

var _joinPrefixedValue = joinPrefixedValue;

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var values = {
  'zoom-in': true,
  'zoom-out': true,
  grab: true,
  grabbing: true
};

function cursor(property, value) {
  if (property === 'cursor' && values[value]) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];
});

var flex_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = { flex: true, 'inline-flex': true };

function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]
    };
  }
}
module.exports = exports['default'];
});

var sizing_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizing;

var _joinPrefixedValue = joinPrefixedValue;

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var properties = {
  maxHeight: true,
  maxWidth: true,
  width: true,
  height: true,
  columnWidth: true,
  minWidth: true,
  minHeight: true
};
var values = {
  'min-content': true,
  'max-content': true,
  'fill-available': true,
  'fit-content': true,
  'contain-floats': true
};

function sizing(property, value) {
  if (properties[property] && values[value]) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];
});

var gradient_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = gradient;

var _joinPrefixedValue = joinPrefixedValue;

var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);

var _isPrefixedValue = isPrefixedValue;

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

function gradient(property, value) {
  if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.match(values) !== null) {
    return (0, _joinPrefixedValue2.default)(property, value);
  }
}
module.exports = exports['default'];
});

var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;

function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
}

var index = hyphenateStyleName;

var transition_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transition;

var _hyphenateStyleName = index;

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _capitalizeString = capitalizeString;

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _isPrefixedValue = isPrefixedValue;

var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);

var _prefixProps = prefixProps;

var _prefixProps2 = _interopRequireDefault(_prefixProps);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true
};

function transition(property, value) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    var _ref2;

    var outputValue = prefixValue(value);
    var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (value) {
      return value.match(/-moz-|-ms-/) === null;
    }).join(',');

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return _defineProperty({}, property, webkitOutput);
    }

    return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _capitalizeString2.default)(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
  }
}

function prefixValue(value) {
  if ((0, _isPrefixedValue2.default)(value)) {
    return value;
  }

  // only split multi values, not cubic beziers
  var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

  // iterate each single value and check for transitioned properties
  // that need to be prefixed as well
  multipleValues.forEach(function (val, index$$1) {
    multipleValues[index$$1] = Object.keys(_prefixProps2.default).reduce(function (out, prefix) {
      var dashCasePrefix = '-' + prefix.toLowerCase() + '-';

      Object.keys(_prefixProps2.default[prefix]).forEach(function (prop) {
        var dashCaseProperty = (0, _hyphenateStyleName2.default)(prop);

        if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          // join all prefixes and create a new value
          out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
        }
      });
      return out;
    }, val);
  });

  return multipleValues.join(',');
}
module.exports = exports['default'];
});

var flexboxIE_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxIE;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var alternativeValues = {
  'space-around': 'distribute',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end'
};
var alternativeProps = {
  alignContent: 'msFlexLinePack',
  alignSelf: 'msFlexItemAlign',
  alignItems: 'msFlexAlign',
  justifyContent: 'msFlexPack',
  order: 'msFlexOrder',
  flexGrow: 'msFlexPositive',
  flexShrink: 'msFlexNegative',
  flexBasis: 'msPreferredSize'
};

function flexboxIE(property, value) {
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}
module.exports = exports['default'];
});

var flexboxOld_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flexboxOld;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var alternativeValues = {
  'space-around': 'justify',
  'space-between': 'justify',
  'flex-start': 'start',
  'flex-end': 'end',
  'wrap-reverse': 'multiple',
  wrap: 'multiple'
};

var alternativeProps = {
  alignItems: 'WebkitBoxAlign',
  justifyContent: 'WebkitBoxPack',
  flexWrap: 'WebkitBoxLines'
};

function flexboxOld(property, value) {
  if (property === 'flexDirection' && typeof value === 'string') {
    return {
      WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
      WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
    };
  }
  if (alternativeProps[property]) {
    return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
  }
}
module.exports = exports['default'];
});

var prefixAll_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixAll;

var _prefixProps = prefixProps;

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _capitalizeString = capitalizeString;

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _calc = calc_1;

var _calc2 = _interopRequireDefault(_calc);

var _cursor = cursor_1;

var _cursor2 = _interopRequireDefault(_cursor);

var _flex = flex_1;

var _flex2 = _interopRequireDefault(_flex);

var _sizing = sizing_1;

var _sizing2 = _interopRequireDefault(_sizing);

var _gradient = gradient_1;

var _gradient2 = _interopRequireDefault(_gradient);

var _transition = transition_1;

var _transition2 = _interopRequireDefault(_transition);

var _flexboxIE = flexboxIE_1;

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = flexboxOld_1;

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// special flexbox specifications


var plugins = [_calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */
function prefixAll(styles) {
  Object.keys(styles).forEach(function (property) {
    var value = styles[property];
    if (value instanceof Object && !Array.isArray(value)) {
      // recurse through nested style objects
      styles[property] = prefixAll(value);
    } else {
      Object.keys(_prefixProps2.default).forEach(function (prefix) {
        var properties = _prefixProps2.default[prefix];
        // add prefixes if needed
        if (properties[property]) {
          styles[prefix + (0, _capitalizeString2.default)(property)] = value;
        }
      });
    }
  });

  Object.keys(styles).forEach(function (property) {
    [].concat(styles[property]).forEach(function (value, index) {
      // resolve every special plugins
      plugins.forEach(function (plugin) {
        return assignStyles(styles, plugin(property, value));
      });
    });
  });

  return styles;
}

function assignStyles(base) {
  var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  Object.keys(extend).forEach(function (property) {
    var baseValue = base[property];
    if (Array.isArray(baseValue)) {
      [].concat(extend[property]).forEach(function (value) {
        var valueIndex = baseValue.indexOf(value);
        if (valueIndex > -1) {
          base[property].splice(valueIndex, 1);
        }
        base[property].push(value);
      });
    } else {
      base[property] = extend[property];
    }
  });
}
module.exports = exports['default'];
});

var _static = prefixAll_1;

var Cache = function () {
  function Cache() {
    classCallCheck(this, Cache);

    this.items = [];
  }

  createClass(Cache, [{
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
    classCallCheck(this, Sheet);

    this.vStyleSheet = this.create('vStyleSheet');
  }

  createClass(Sheet, [{
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
  Object.keys(styles).forEach(function (s) {
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
      declarations = declarations.concat(prefix(s, styles[s]));
    }
  });

  return declarations;
};

var buildFontface = function buildFontface() {
  var styles = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var declarations = '';
  Object.keys(styles).forEach(function (s) {
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
  Object.keys(keyframe).forEach(function (kf) {
    var declarations = buildDeclarations(keyframe[kf]);
    keyframes = keyframes.concat(kf + ' { ' + declarations + ' }\n');
  });

  return keyframes;
};

var buildRuleset = function buildRuleset(element, customSheet) {
  var stylesheet = customSheet ? customSheet : vStyleSheet;
  var className = guid();
  var classes = {};

  Object.keys(element).forEach(function (k) {
    var newClassName = k + '-' + className;
    var styles = element[k];
    var prefixed = _static(styles);

    // build base level styles (strings)
    var declarations = buildDeclarations(prefixed);
    if (declarations.length > 0) {
      var rule = '.' + newClassName + ' { ' + declarations + ' }';
      stylesheet.insertRule(rule, stylesheet.cssRules.length);
    }

    // handle special cases (objects)
    Object.keys(styles).forEach(function (s) {
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
