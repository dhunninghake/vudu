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
      const needsPrefix = /[A-Z]/.test(s[0]);
      const cssProperty = needsPrefix ? `-${camelToHyphen(s)}` : camelToHyphen(s);
      const declaration = `${cssProperty}: ${styles[s]};`;
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


const buildFontface = (styles={}) => {
  let declarations = '';
  Object.keys(styles).forEach(s => {
    if (!Array.isArray(styles[s])) {
      declarations = declarations.concat(`${camelToHyphen(s)}: ${styles[s]};`);
    } else {
      let sourceDecs = 'src: ';
      styles[s].forEach((source, index) => {
        if (source.format === 'embedded-opentype') {
          const line = `url(${source.path}?#iefix) format('${source.format}'),`;
          sourceDecs = `src: url(${source.path}); ${sourceDecs}`;
          sourceDecs = sourceDecs.concat(line);
        } else {
          const comma = index < styles[s].length - 1 ? ',' : '';
          const line = `url(${source.path}) format('${source.format}')${comma}`;
          sourceDecs = sourceDecs.concat(line);
        }
      });
      sourceDecs = sourceDecs.concat(';');
      declarations = declarations.concat(sourceDecs);
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


const buildRuleset = (element, customSheet) => {
  const stylesheet = customSheet ? customSheet : vStyleSheet;
  const className = guid();
  const classes = {};

  Object.keys(element).forEach(k => {
    const newClassName = `${k}-${className}`;
    const styles = element[k];
    const prefixed = prefixer(styles);

    // build base level styles (strings)
    const declarations = buildDeclarations(prefixed);
    if (declarations.length > 0) {
      const rule = `.${newClassName} { ${declarations} }`;
      stylesheet.insertRule(rule, stylesheet.cssRules.length);
    }

    // handle special cases (objects)
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
        } else if (s.startsWith('@font-face')) {
          const fontface = buildFontface(styles[s]);
          const rule = `${s} { ${fontface} }`;
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


let vFunction = function(el, customSheet) {
  // return cached styles
  for (let i = 0; i < cache.items.length; i++) {
    if (deepEqual(cache.items[i].element, el)) {
      return cache.items[i].classes;
    }
  }

  // otherwise create new ones!
  const cacheItem = {};
  const classes = buildRuleset(el, customSheet);

  cacheItem.element = el;
  cacheItem.classes = classes;
  cache.addItem(cacheItem);

  return classes;
};

export const v = vFunction;
export default vFunction;

