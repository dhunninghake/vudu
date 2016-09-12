import { guid, deepEqual, camelToHyphen, } from './utils';
import Cache from './cache';
import Sheet from './sheet';

export let cache = new Cache();
export let sheet = new Sheet();

const { stylesheet } = sheet;


const buildDeclarations = (styles={}) => {
  let declarations = '';
  Object.keys(styles).forEach(s => {
    if (typeof styles[s] !== 'object') {
      const cssProperty = camelToHyphen(s);
      const declaration = `${cssProperty}: ${styles[s]};`;
      declarations = declarations.concat(declaration);
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

const buildRuleset = (element, className) => {
  const classes = {};
  
  Object.keys(element).forEach(k => {
    const newClassName = `${className}-${k}`;
    const styles = element[k];

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
      } else {
        const declarations = buildDeclarations(styles);
        const rule = `.${newClassName} { ${declarations} }`;
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
      }
    });
    
    classes[k] = newClassName;
  });

  return classes;
};


export default function v(el) {
  //return cached styles
  for (let i = 0; i < cache.items.length; i++) {
    if (deepEqual(cache.items[i].element, el)) {
      return cache.items[i].classes;
    }
  }

  //otherwise create new ones!
  const cacheItem = {};
  const className = `v-${guid()}`;
  const classes = buildRuleset(el, className);

  cacheItem.element = el;
  cacheItem.className = className;
  cacheItem.classes = classes;
  cache.addItem(cacheItem);

  return classes;
};

