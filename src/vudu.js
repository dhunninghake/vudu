import prefixer from 'inline-style-prefixer/static';
import { guid, deepEqual, createSheet } from './utils';
import { atomics, config } from './atomics';

export let cache = [];

const vuduSheet = createSheet('vSheet');

const hyphen = s => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const vendor = s => /[A-Z]/.test(s[0]) ? `-${hyphen(s)}` : hyphen(s);


const attachRule = (rule, customSheet) => {
  if (typeof document === 'undefined') { return; }
  const sheet = customSheet || vuduSheet;
  sheet.insertRule(rule, sheet.cssRules.length);
};


const formatRule = (styles={}) => {
  const prefixed = prefixer(styles);
  
  const flatten = (arr) => {
    return arr.reduce((a, b) => {
      return a.concat(Array.isArray(b) ? flatten(b) : b)
    },[])
  };

  const assign = (dec={}) => {
    const val = dec.value;
    if (Array.isArray(val)) {
      if (typeof val[0] === 'object') {
        return val.map(v => Object.keys(v).map(k => ({key: vendor(k), value: v[k]})));
      } else {
        return val.map(v => ({key: dec.key, value: v}));
      }
    }
    return dec;
  };

  const formattedRule = flatten(Object.keys(prefixed)
    .map(key => assign({key: key.startsWith('@keyframes') ? key : vendor(key), value: prefixed[key]})))
    .map(dec => typeof dec.value === 'object' ? ({key: dec.key, value: formatRule(dec.value)}) : dec);

  if (formattedRule.some(r => r.key.startsWith('@media'))) {
    return formattedRule.map(r => {
      if (typeof r.value === 'object') {
        return {
          key: r.key,
          value: r.value.map(v => {
            return typeof v.value === 'object' ? ({key: v.key, value: v.value, query: r.key}) : v;
          })
        };
      } else {
        return r;
      }
    });
  }

  return formattedRule;
};


const addRule = (styles=[], classname, sheet, addBase) => {
  const base = (style) => {
    return style.filter(s => typeof s.value !== 'object')
      .map(s => `${s.key}: ${s.value}`).join(';');
  };

  if (addBase) {
    // console.log(`.${classname} { ${base(styles)}; }`);
    attachRule(`.${classname} { ${base(styles)}; }`, sheet);
  }

  const specialCase = (s) => {
    if (s.key.startsWith(':')) {
      return {
        classname: `${classname}${s.key}`,
        rule: `.${classname}${s.key} { ${base(s.value)}; }`
      };
    } else if (s.key.startsWith('@media')) {
      return {
        classname: `${classname}`,
        rule: `${s.key} { .${classname} { ${base(s.value)} } }`
      };
    } else if (s.key.startsWith('@keyframes')) {
      const dec = s.value.map(kf => `${kf.key} { ${base(kf.value)}; }`).join(' ');
      return {
        classname: `${s.key}`,
        rule: `${s.key} { ${dec} }`
      };
    } else {
      return {
        classname: `${classname} ${s.key}`,
        rule: `.${classname} ${s.key} { ${base(s.value)}; }`
      };
    }
  };

  styles.filter(s => typeof s.value === 'object')
    .forEach(s => {
      if (s.query && s.query.startsWith('@media')) {
        attachRule(`${s.query} { ${specialCase(s).rule} }`, sheet);
      } else {
        // console.log(specialCase(s).rule);
        attachRule(specialCase(s).rule, sheet);  
      }

      if (!s.key.startsWith('@keyframes')) {
        addRule(s.value, specialCase(s).classname, sheet, false);
      }
    });
};


const addFontFace = (font={}, customSheet) => {
  const sheet = customSheet || vuduSheet;
  const dec = formatRule(font).map(r => `${r.key}: ${r.value}`).join(';');
  attachRule(`@font-face { ${dec}; }`, sheet);
  return font.fontFamily.toString();
};


const buildRuleset = (group, sheet) => {
  const rules = Object.keys(group).map(classname => {
    return {
      classname: classname, 
      vuduClass: `${classname}-${guid()}`,
      styles: group[classname]
    }
  });
  rules.forEach(r => addRule(formatRule(r.styles), r.vuduClass, sheet, true));
  return rules.reduce((a, b) => {
    a[b.classname] = b.vuduClass; 
    return a;
  },{});
};


const v = (el, customSheet) => {
  // return cached classes
  const cachedItem = cache.find(item => deepEqual(item.element, el));
  if (cachedItem) {
    return cachedItem.classes;
  }

  // otherwise make and cache new ones
  const sheet = customSheet || vuduSheet;
  const classes = buildRuleset(el, sheet);
  const cacheItem = {};
  cacheItem.element = el;
  cacheItem.classes = classes;
  cache.push(cacheItem);

  // object
  return classes;
};


const showOutput = () => {
  const rules = vuduSheet.cssRules;
  console.log(Object.keys(rules).map(r => rules[r].cssText).join('\n\n'));
};


v.addFontFace = addFontFace;
v.showOutput = showOutput;
v.atomics = atomics;
v.config = config;

export default v;

