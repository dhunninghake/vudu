import deepEqual from 'deep-equal';
import uniqueId from 'lodash.uniqueid';
import { createSheet } from './utils';
import { composes, config } from './composes';
import { attachRule, addRule } from './attach';
import { formatRule } from './format';

let cache = [];

let vuduSheet = createSheet('vSheet');

/**
 * buildRuleset:
 * 1) Generates unique vudu classes
 * 2) Adds formatted rules to the sheet
 * 3) Returns an object of vudu classes
 *
 * @param {Object} group
 * @param {Object} sheet
 * @param {Object} [options={}]
 * @returns {Object}
 */
const buildRuleset = (group, sheet, options={}) => {
  const suffix = typeof options.suffix === 'function' ? options.suffix() : options.suffix;
  const rules = Object.keys(group).map(classname => {
    return {
      classname,
      vuduClass: `${classname}-${suffix || uniqueId()}`,
      styles: group[classname],
    };
  });
  rules.forEach(r => addRule(formatRule(r.styles), r.vuduClass, sheet, true));
  return rules.reduce((a, b) => ({
    ...a,
    [b.classname]: b.vuduClass,
  }), {});
};

/**
 * V kicks off adding a new rule.
 *
 * @param {Object} el
 * @param {Object} [customSheet]
 * @param {Object} [options={}]
 * @returns {Object}
 */
const v = (el, customSheet, options={}) => {
  const cachedItem = cache.find(item => deepEqual(item.element, el));
  if (cachedItem) {
    return cachedItem.classes;
  }

  const sheet = customSheet || vuduSheet;
  const classes = buildRuleset(el, sheet, options);
  const cacheItem = {};
  cacheItem.element = el;
  cacheItem.classes = classes;
  cache.push(cacheItem);

  return classes;
};

/**
 * PUBLIC METHODS
 */
const addFontFace = (font, customSheet) => {
  const sheet = customSheet || vuduSheet;
  const dec = formatRule(font)
    .map(r => `${r.key}: ${r.value}`)
    .join(';');
  attachRule(`@font-face { ${dec}; }`, sheet);
  return font.fontFamily.toString();
};

const logOutput = () => {
  const rules = vuduSheet.cssRules;
  console.log(
    Object.keys(rules)
      .map(r => rules[r].cssText)
      .join('\n\n')
  );
};

/**
 * Curries v to make configuring v easier
 *
 * @param {Object} options
 * @returns {Function}
 */
const options = (options) => (el, customSheet) => v(el, customSheet, options)

v.addFontFace = addFontFace;
v.logOutput = logOutput;
v.composes = composes;
v.config = config;
v.options = options;
v.v = v;

export default v;
