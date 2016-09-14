import { guid, deepEqual, camelToHyphen, } from './utils';
import prefixer from 'inline-style-prefixer/static';
import Cache from './cache';
import Sheet from './sheet';

export let cache = new Cache();
export let sheet = new Sheet();

const { vStyleSheet } = sheet;


const prefix = (prop, vendors) => {
  let flattened = '';
  vendors.forEach(v => flattened = flattened.concat(`${prop}: ${v};`));
  return flattened;
};


const buildDeclarations = (styles={}) => {
  let declarations = '';
  Object.keys(styles).forEach(s => {
    if (typeof styles[s] !== 'object') {
      const needsPrefix = /[A-Z]/.test( s[0]);
      const cssProperty = needsPrefix ? `-${camelToHyphen(s)}` : camelToHyphen(s);
      const declaration = `${cssProperty}: ${styles[s]};`;
      declarations = declarations.concat(declaration);
    }

    //for cases like flexbox
    if (Array.isArray(styles[s])) {
      declarations = declarations.concat(prefix(s, styles[s]));
    }
  });
  
  return declarations;
};


const buildKeyframes = (keyframe={}) => {
  let keyframes = '';
  Object.keys(keyframe).forEach(kf => {
    const declarations = buildDeclarations(keyframe[kf]);
    keyframes = keyframes.concat(`${kf} { ${declarations} }\n`);
  });

  return keyframes;
};

const buildRuleset = (element, className, customSheet) => {
  const stylesheet = customSheet ? customSheet : vStyleSheet;
  const classes = {};
  
  Object.keys(element).forEach(k => {
    const newClassName = `${className}-${k}`;
    const styles = element[k];
    const prefixed = prefixer(styles);

    //build base level styles (strings)
    const declarations = buildDeclarations(prefixed);
    const rule = `.${newClassName} { ${declarations} }`;
    console.log(rule);
    stylesheet.insertRule(rule, stylesheet.cssRules.length);

    //handle special cases (objects)
    Object.keys(styles).forEach(s => {      
      if (typeof styles[s] === 'object') {
        const declarations = buildDeclarations(styles[s]);
        if (s.startsWith('@media')) {
          const rule = `${s} { .${newClassName} { ${declarations} } }`;
          stylesheet.insertRule(rule, stylesheet.cssRules.length);
        } else if (s.startsWith(':')) {
          const rule = `.${newClassName}${s} { ${declarations} }`;
          stylesheet.insertRule(rule, stylesheet.cssRules.length);
        } else if (s.startsWith('@keyframes')) {
          const keyframes = buildKeyframes(styles[s]);
          const rule = `${s} {\n ${keyframes} \n}`;
          stylesheet.insertRule(rule, stylesheet.cssRules.length);
        } else {
          const rule = `.${newClassName} ${s} { ${declarations} }`;
          stylesheet.insertRule(rule, stylesheet.cssRules.length);
        }
      }
    });

    classes[k] = newClassName;
  });

  return classes;
};


export default function v(el, customSheet) {
  //return cached styles
  for (let i = 0; i < cache.items.length; i++) {
    if (deepEqual(cache.items[i].element, el)) {
      return cache.items[i].classes;
    }
  }

  //otherwise create new ones!
  const cacheItem = {};
  const className = `v-${guid()}`;
  const classes = buildRuleset(el, className, customSheet);

  cacheItem.element = el;
  cacheItem.className = className;
  cacheItem.classes = classes;
  cache.addItem(cacheItem);

  return classes;
};

