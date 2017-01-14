import { guid, deepEqual, createSheet } from './utils';
import { composes, config } from './composes';
import { attachRule, addRule } from './attach';
import { formatRule } from './format';

let cache = [];

let vuduSheet = createSheet('vSheet');



/**
 * buildRuleset does a few things:
 * 1) Generates a unique vudu class for each rule
 * 2) Sends the formatted style object to addRule to be added
 * 3) Returns an object of vudu classes corresponding to rules added
 *
 * @param {Object} group
 * @param {Object} sheet
 * @returns {Object}
 */
const buildRuleset = (group, sheet) => {
  const rules = Object.keys(group).map(classname => {
    return {
      classname, 
      vuduClass: `${classname}-${guid()}`,
      styles: group[classname]
    };
  });
  rules.forEach(r => addRule(formatRule(r.styles), r.vuduClass, sheet, true));
  return rules.reduce((a, b) => {
    a[b.classname] = b.vuduClass; 
    return a;
  },{});
};



/**
 * V kicks off adding a new rule.
 *
 * @param {Object} el
 * @param {Object} [customSheet]
 * @returns {Object}
 */
const v = (el, customSheet) => {
  const cachedItem = cache.find(item => deepEqual(item.element, el));
  if (cachedItem) {
    return cachedItem.classes;
  }

  const sheet = customSheet || vuduSheet;
  const classes = buildRuleset(el, sheet);
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
  const dec = formatRule(font).map(r => `${r.key}: ${r.value}`).join(';');
  attachRule(`@font-face { ${dec}; }`, sheet);
  return font.fontFamily.toString();
};

const logOutput = () => {
  const rules = vuduSheet.cssRules;
  console.log(Object.keys(rules).map(r => rules[r].cssText).join('\n\n'));
};


v.addFontFace = addFontFace;
v.logOutput = logOutput;
v.composes = composes;
v.config = config;
v.v = v;

export default v;

