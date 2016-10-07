import { guid, deepEqual, camelToHyphen, createSheet } from './utils';
import prefixer from 'inline-style-prefixer/static';
import { atomicClasses, setupExtends } from './atomics';
import Cache from './cache';


const prefix = (prop, vendors) => {
  let flattened = '';
  vendors.forEach(v => flattened = flattened.concat(`${camelToHyphen(prop)}: ${v};`));

  return flattened;
};


const buildDeclarations = (styles={}) => {
  let declarations = '';
  Object.keys(styles).forEach(s => {
    if (!s.startsWith('@')) {
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


const parseComposes = (styles={}) => {
  if (styles.hasOwnProperty('@composes')) {
    const baseAtomics = {};
    const specialAtomics = {};
    styles['@composes'].forEach((c, i) => {
      Object.keys(c).forEach(k => {
        if (typeof c[k] === 'object') {
          Object.assign(specialAtomics, c);
        } else {
          Object.assign(baseAtomics, c);
        }
      });
    });
    return {
      baseAtomics,
      specialAtomics
    }
  }
};


const addToSheet = (styles, className, sheet, addBaseStyles) => {
  const prefixed = prefixer(styles);
  const declared = buildDeclarations(prefixed);
  const composes = parseComposes(prefixed) || {};
  const hasComposes = Object.keys(composes).length > 0;
  const composed = hasComposes ? 
    `${buildDeclarations(composes.baseAtomics)} ${declared}` :
    `${declared}`;

  if (composed.length > 0 && addBaseStyles) {
    const rule = `.${className} { ${composed} }`;
    sheet.insertRule(rule, sheet.cssRules.length);
  }

  // handle special cases (objects)
  Object.keys(styles).forEach(s => {
    if (typeof styles[s] === 'object') {
      const sub_prefixed = prefixer(styles[s]);
      const sub_declared = buildDeclarations(sub_prefixed);
      const sub_composes = parseComposes(sub_prefixed) || {};
      const sub_composed = Object.keys(sub_composes).length > 0 ? 
        `${buildDeclarations(sub_composes.baseAtomics)} ${sub_declared}` :
        `${sub_declared}`;

      if (s.startsWith('@keyframes')) {
        const rule = `${s} { ${buildKeyframes(styles[s])} }`;
        sheet.insertRule(rule, sheet.cssRules.length);
      } else if (s.startsWith('@font-face')) {
        const rule = `${s} { ${buildFontface(styles[s])} }`;
        sheet.insertRule(rule, sheet.cssRules.length);
      } else if (s.startsWith('@media')) {
        if (sub_composed.length > 0) {
          const rule = `${s} { .${className} { ${sub_composed} } }`;
          sheet.insertRule(rule, sheet.cssRules.length);
        }
      } else if (s.startsWith(':')) {
        if (sub_composed.length > 0) {
          const rule = `.${className}${s} { ${sub_composed} }`;
          sheet.insertRule(rule, sheet.cssRules.length);
        }
      } else {
        if (sub_composed.length > 0) {
          const rule = `.${className} ${s} { ${sub_composed} }`;
          sheet.insertRule(rule, sheet.cssRules.length);
        }
      }
    }
  });

  if (hasComposes) {
    addToSheet(composes.specialAtomics, className, sheet, false);
  }

};


const buildRuleset = (element, sheet) => {
  const uniqueId = guid();
  const classes = {};
  Object.keys(element).forEach(k => {
    const className = `${k}-${uniqueId}`;
    const styles = element[k];

    addToSheet(styles, className, sheet, true);
    classes[k] = className;
  });

  return classes;
};


const vFunction = (el, customSheet) => {
  const sheet = customSheet ? customSheet : createSheet('vStyleSheet');

  // return cached styles
  for (let i = 0; i < cache.items.length; i++) {
    if (deepEqual(cache.items[i].element, el)) {
      return cache.items[i].classes;
    }
  }

  // otherwise create new ones!
  const cacheItem = {};
  const classes = buildRuleset(el, sheet);
  cacheItem.element = el;
  cacheItem.classes = classes;
  cache.addItem(cacheItem);

  return classes;
};

export const cache = new Cache();
export const atomics = atomicClasses;
export const config = setupExtends;
export const v = vFunction;
export default vFunction;

