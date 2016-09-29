import { guid, deepEqual, camelToHyphen, } from './utils';
import prefixer from 'inline-style-prefixer/static';
import { atomics } from './atomics';
import Cache from './cache';
import Sheet from './sheet';

export let cache = new Cache();
export let sheet = new Sheet();

const { vStyleSheet } = sheet;


const prefix = (prop, vendors) => {
  let flattened = '';
  vendors.forEach(v => flattened = flattened.concat(`${camelToHyphen(prop)}: ${v};`));

  return flattened;
};


const buildDeclarations = (styles={}) => {
  let declarations = '';
  Object.keys(styles).forEach(s => {
    if (!s.startsWith('@') && !s.startsWith('extend')) {
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


function addToSheet(styles, className, stylesheet, addBaseStyles) {
  const prefixed = prefixer(styles);

  // build base level styles (strings)
  let base = buildDeclarations(prefixed);

  // handle special cases (objects)
  Object.keys(styles).forEach(s => {
    if (typeof styles[s] === 'object') {
      const special = buildDeclarations(styles[s]);
      if (s.startsWith(':')) {
        const rule = `.${className}${s} { ${special} }`;
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
      } else if (s.startsWith('@keyframes')) {
        const rule = `${s} { ${buildKeyframes(styles[s])} }`;
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
      } else if (s.startsWith('@font-face')) {
        const rule = `${s} { ${buildFontface(styles[s])} }`;
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
      } else if (s.startsWith('extend')) {
        const baseAtomics = {};
        const specialAtomics = {};
        const parseAtomics = (atomics) => {
          return new Promise((resolve, reject) => {
            atomics.forEach((atomic, i) => {
              Object.keys(atomic).forEach(k => {
                if (typeof atomic[k] === 'object') {
                  Object.assign(specialAtomics, atomic);
                } else {
                  Object.assign(baseAtomics, atomic);
                }
              });
              if (i === atomics.length - 1) {
                resolve();
              }
            });
          });
        };

        parseAtomics(styles[s]).then(() => {
          base = base.concat(buildDeclarations(baseAtomics));
          const rule = `.${className} { ${base} }`;
          stylesheet.insertRule(rule, stylesheet.cssRules.length);
          addToSheet(specialAtomics, className, stylesheet, false);
        });
      } else if (s.startsWith('@media')) {
        const rule = `${s} { .${className} { ${special} } }`;
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
      } else {
        const rule = `.${className} ${s} { ${special} }`;
        stylesheet.insertRule(rule, stylesheet.cssRules.length);
      }
    }
  });

  if (base.length > 0 && addBaseStyles) {
    const rule = `.${className} { ${base} }`;
    stylesheet.insertRule(rule, stylesheet.cssRules.length);
  }
}


const buildRuleset = (element, customSheet) => {
  const stylesheet = customSheet ? customSheet : vStyleSheet;
  const uniqueId = guid();
  const classes = {};

  Object.keys(element).forEach(k => {
    const className = `${k}-${uniqueId}`;
    const styles = element[k];
    
    addToSheet(styles, className, stylesheet, true);

    classes[k] = className;
  });

  return classes;
};


const vFunction = (el, customSheet) => {
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

