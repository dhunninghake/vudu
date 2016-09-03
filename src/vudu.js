import { 
  guid, 
  vStyleSheet, 
  camelToHyphen, 
} from './utils';

let cache = [];

const buildDeclarations = (styles) => {
  let declarations = '';
  Object.keys(styles).forEach(s => {
    const cssProperty = camelToHyphen(s);
    const declaration = `${cssProperty}: ${styles[s]};`;

    if (!s.startsWith('@')) {
      declarations = declarations.concat(declaration);
    }
  });
  return declarations;
};


const buildRuleset = (item, decs) => {
  const classes = {};
  
  Object.keys(item.element).forEach(k => {
    let className = `${item.className}-${k}`;

    if (decs) {

      const declarations = buildDeclarations(item.element[k]);
      const rule = `.${className} { ${declarations} }`;
      vStyleSheet.insertRule(rule, vStyleSheet.rules.length);

      Object.keys(item.element[k]).forEach(s => { 
        const styles = item.element[k];
        
        if (s.startsWith('@')) {
          const declarations = buildDeclarations(styles[s]);
          const rule = `${s} { .${className} { ${declarations} } }`;
          vStyleSheet.insertRule(rule, vStyleSheet.rules.length);
        }
        if (s.startsWith('>>')) {
          const declarations = buildDeclarations(styles[s]);
          s = s.replace('>> ', '');
          const rule = `.${className} ${s} { ${declarations} }`;
          vStyleSheet.insertRule(rule, vStyleSheet.rules.length);
        }
      });
    }
    
    classes[k] = className;
  });
  return classes;
};


export default function v(el) {
  const cacheItem = {};
  
  //return cached styles
  if (cache.length > 0) {
    for (let i = 0; i < cache.length; i++) {
      if (JSON.stringify(cache[i].element) === JSON.stringify(el)) {
        return buildRuleset(cache[i], false);
      }
    }
  }

  //cache new styles
  cacheItem.element = el;
  cacheItem.className = `v-${guid()}`;
  cache.push(cacheItem);

  console.log(vStyleSheet);

  //return an object of classnames
  return buildRuleset(cacheItem, true);
};