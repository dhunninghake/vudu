import { prefix } from 'inline-style-prefixer';

let cache = {};
const rules = [];

let insert = rule => rules.push(rule);

const hash = s => s.replace(/[A-Z]|^ms/g, '-$&').toLowerCase();
const mq = (rule, media) => (media ? cl(media, rule) : rule);
const dec = (a, b) => `${hash(a)}:${b};`;
const cl = (c, d) => `${c}{${d}}`;

const parse = (s, c, media = false) => {
  Object.keys(prefix(s))
    .sort()
    .filter(k => Boolean(s[k]))
    .reduce(
      (a, b) =>
        typeof s[b] === 'string' || Array.isArray(s[b])
          ? [[...a[0], b], a[1]]
          : [a[0], [...a[1], b]],
      [[], []]
    )
    .map((arr, idx) => {
      if (arr.length === 0) {
        return;
      }

      if (idx === 0) {
        const declarations = arr.reduce((a, b) => {
          return (a += Array.isArray(s[b])
            ? s[b].reduce((c, d) => (c += dec(b, d)), '')
            : dec(b, s[b]));
        }, '');

        insert(mq(cl(c, declarations), media));
      }

      if (idx === 1) {
        arr.map(k => {
          if (/^:/.test(k)) {
            parse(s[k], `${c}${k}`);
          } else if (/^@/.test(k)) {
            parse(s[k], c, k);
          } else {
            parse(s[k], `${c} ${k}`);
          }
        });
      }
    });
};

const v = (styles, customClass) => {
  const _key = (customClass || '') + JSON.stringify(styles);
  if (cache[_key]) {
    return cache[_key];
  }

  const classname =
    customClass ||
    `.v-${Math.random()
      .toString(36)
      .substring(2, 15)}`;

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
    rules.push(rule);
    try {
      sheet.insertRule(rule, sheet.cssRules.length);
    } catch (e) {
      console.warn('Vudu: Failed to insert rule:', rule, e);
    }
  };
}

export default vudu;
