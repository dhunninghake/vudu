import uniqueId from 'lodash.uniqueid';
import { createSheet, deepEqual } from './utils';
import { attachRule, addRule } from './attach';
import { formatRule } from './format';

let cache = [];

let vuduSheet = createSheet('vSheet');

const buildRuleset = (group, sheet, options = {}) => {
  const suffix =
    typeof options.suffix === 'function' ? options.suffix() : options.suffix;
  const rules = Object.keys(group).map(classname => {
    return {
      classname,
      vuduClass: `${classname}-${suffix || uniqueId()}`,
      styles: group[classname],
    };
  });
  rules.forEach(r => addRule(formatRule(r.styles), r.vuduClass, sheet, true));
  return rules.reduce(
    (a, b) => ({
      ...a,
      [b.classname]: b.vuduClass,
    }),
    {}
  );
};

const v = (el, customSheet, options = {}) => {
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

const options = options => (el, customSheet) => v(el, customSheet, options);

export default {
  addFontFace,
  logOutput,
  options,
  v,
};
