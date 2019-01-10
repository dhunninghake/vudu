const kebabCase = s => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const camelCase = s => s.replace(/-([a-z])/g, (m, w) => w.toUpperCase());

export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

export const isArray = obj => obj.constructor === Array;

export const convertToKebabCase = str => {
  if (str.startsWith('@keyframes')) {
    return str;
  }

  const isFirstLetterCapitalized = /[A-Z]/.test(str[0]);
  const kebabed = isFirstLetterCapitalized
    ? `-${kebabCase(str)}`
    : kebabCase(str);

  // convert any strings inside brackets back to camelCase
  return kebabed.replace(/\[(.+?)\]/g, insideBrackets => {
    return camelCase(insideBrackets);
  });
};

export const createSheet = id => {
  const existingSheet = document.getElementById(id);
  if (existingSheet) {
    return existingSheet.sheet;
  }

  let style = document.createElement('style');
  style.setAttribute('id', id);
  document.head.appendChild(style);
  return style.sheet;
};

export const deepEqual = (a, b) => {
  const isAobj = typeof a === 'object';
  const isBobj = typeof b === 'object';
  const isABobjs = isAobj && isBobj;
  let out = a === b;

  function checkX(x) {
    let ix, res;
    for (ix in x) {
      if (x.hasOwnProperty(ix)) {
        res = deepEqual(a[ix], b[ix]);
      }
      if (!res) {
        break;
      }
    }
    return res;
  }
  if (a && b && isABobjs && !out) {
    out = checkX(a) && checkX(b);
  }
  return out;
};
