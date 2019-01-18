import { prefix } from 'inline-style-prefixer';

let cache = {};
const rules = [];

let insert = rule => rules.push(rule);
const cl = (c, d, k) => `${c} {${d}}`;
const mq = (c, d, k) => `${k} { ${cl(c, d)} }`;
const kebab = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();

const parse = (s, c, method = cl, selector) => {
  const keys = Object.keys(prefix(s));
  const str = keys.filter(k => typeof s[k] === 'string' || Array.isArray(s[k]));
  const obj = keys.filter(
    k => Boolean(s[k]) && typeof s[k] === 'object' && !Array.isArray(s[k])
  );

  const d = str.reduce((a, b) => {
    const dec = Array.isArray(s[b])
      ? s[b].reduce((c, d) => (c += `${b}:${d};`), '')
      : `${kebab(b)}:${s[b]};`;

    return (a += dec);
  }, '');

  if (Boolean(d)) {
    insert(method(c, d, selector));
  }

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

vudu.css = () => rules.join('');

vudu.reset = () => {
  cache = {};
  while (rules.length) {
    rules.pop();
  }
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
