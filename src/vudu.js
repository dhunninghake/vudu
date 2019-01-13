let cache = {};
const rules = [];

let insert = rule => rules.push(rule);
const cl = (c, d, k) => `${c} {${d}}`;
const mq = (c, d, k) => `${k} { ${cl(c, d)} }`;
const kebab = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

const parse = (s, c, method = cl, selector) => {
  const keys = Object.keys(s);
  const str = keys.filter(k => typeof s[k] === 'string');
  const obj = keys.filter(k => Boolean(s[k]) && typeof s[k] === 'object');
  const d = str.reduce((a, b) => (a += `${kebab(b)}:${s[b]};`), '');
  const rule = method(c, d, selector);

  console.log(rule);
  insert(rule);

  obj.map(k => {
    if (k.startsWith(':')) {
      parse(s[k], `${c}${k}`, cl, k);
    } else if (k.startsWith('@media')) {
      parse(s[k], c, mq, k);
    } else {
      parse(s[k], `${c} ${k}`, cl, k);
    }
  });
};

const v = (styles, customClass) => {
  const _key = JSON.stringify(styles);
  if (cache[_key]) {
    return cache[_key].classname;
  }

  const classname = customClass || `.v-${Math.round(Math.random() * 10000)}`;
  parse(styles, classname);
  cache[_key] = classname;
  return classname;
};

const vudu = x => {
  return typeof x === 'string' ? styles => v(styles, x) : v(x);
};

if (typeof document !== 'undefined') {
  const sheet = document.head.appendChild(document.createElement('style'))
    .sheet;
  insert = rule => {
    rules.push[rule];
    try {
      sheet.insertRule(rule, sheet.cssRules.length);
    } catch (e) {
      console.warn('Vudu: Failed to insert rule:', rule, e);
    }
  };
}

export default vudu;
