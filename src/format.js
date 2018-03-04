import prefixer from 'inline-style-prefixer/static';
import { isArray, convertToKebabCase } from './utils';

const splitDeclarations = obj => {
  return Object.keys(obj).map(k => ({
    key: convertToKebabCase(k),
    value: obj[k],
  }));
};

const flattenArrays = arr => {
  return arr.reduce((a, b) => a.concat(isArray(b) ? flattenArrays(b) : b), []);
};

const handleArrays = arr => {
  return arr.map(obj => {
    if (!isArray(obj.value)) {
      return obj;
    }

    if (obj.value.every(i => typeof i === 'string')) {
      return obj.value.map(v => ({ key: obj.key, value: v }));
    } else {
      return obj.value.map(v => handleArrays(splitDeclarations(v)));
    }
  });
};

const handleRecursion = arr => {
  return arr.map(obj => {
    if (typeof obj.value !== 'object') {
      return obj;
    }

    return {
      key: obj.key,
      value: formatRule(obj.value),
    };
  });
};

const handleMediaQueries = arr => {
  const isMediaQuery = str => str.startsWith('@media');
  if (!arr.some(r => isMediaQuery(r.key))) {
    return arr;
  }

  return arr.map(r => {
    if (!isMediaQuery(r.key)) {
      return r;
    }

    const recurse = val => {
      return val.map(v => {
        return typeof v.value === 'object'
          ? {
              key: v.key,
              value: recurse(v.value),
              query: r.key,
            }
          : v;
      });
    };

    return {
      key: r.key,
      value: recurse(r.value),
    };
  });
};

export const formatRule = styles => {
  return [styles]
    .map(prefixer)
    .map(splitDeclarations)
    .map(handleArrays)
    .map(flattenArrays)
    .map(handleRecursion)
    .map(handleMediaQueries)[0];
};
