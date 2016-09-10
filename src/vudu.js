import { 
  guid, 
  deepEqual,
  createStyleSheet, 
  camelToHyphen, 
} from './utils';

let cache = [];

const vStyleSheet = createStyleSheet();

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


const buildRuleset = (element, className) => {
  const classes = {};
  
  Object.keys(element).forEach(k => {
    const newClassName = `${className}-${k}`;
    const styles = element[k];

    Object.keys(styles).forEach(s => {
      if (typeof styles[s] === 'object') {
        const declarations = buildDeclarations(styles[s]);
        if (s.startsWith('@')) {
          const rule = `${s} { .${newClassName} { ${declarations} } }`;
          vStyleSheet.insertRule(rule, vStyleSheet.rules.length);
        } else if (s.startsWith(':')) {
          const rule = `.${newClassName}${s} { ${declarations} }`;
          vStyleSheet.insertRule(rule, vStyleSheet.rules.length);
        } else {
          const rule = `.${newClassName} ${s} { ${declarations} }`;
          vStyleSheet.insertRule(rule, vStyleSheet.rules.length);
        }
      } else {
        const declarations = buildDeclarations(styles);
        const rule = `.${newClassName} { ${declarations} }`;
        vStyleSheet.insertRule(rule, vStyleSheet.rules.length);
      }
    });
    
    classes[k] = newClassName;
  });

  return classes;
};

export default function v(el) {
  //return cached styles
  for (let i = 0; i < cache.length; i++) {
    if (deepEqual(cache[i].element, el)) {
      return cache[i].classes;
    }
  }

  //otherwise create new ones!
  const cacheItem = {};
  const className = `v-${guid()}`;
  const classes = buildRuleset(el, className);

  cacheItem.element = el;
  cacheItem.className = className;
  cacheItem.classes = classes;
  cache.push(cacheItem);

  return classes;
};

