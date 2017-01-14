import prefixer from 'inline-style-prefixer/static';
import { vendor } from './utils';

const Format = x => {
  return {
    map: f => Format(f(x)),
    fold: f => f(x),
    inspect: () => console.log(x)
  };
};

const splitDeclarations = obj => {
  return Object.keys(obj).map(k => ({ key: vendor(k), value: obj[k] }));
};

const flattenArrays = arr => {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flattenArrays(b) : b),[]);
};

const handleArrays = arr => {
  return arr.map(obj => {
    if (Array.isArray(obj.value)) {
      if (typeof obj.value === 'object') {
        return obj.value.map(v => handleArrays(splitDeclarations(v)));
      } else {
        return obj.value.map(v => ({ key: obj.key, value: v }));
      }
    }
    return obj;
  });
};

const handleRecursion = arr => {
  return arr.map(obj => {
    if (typeof obj.value === 'object') {
      return { key: obj.key, value: formatRule(obj.value) };
    }
    return obj;
  });
};

const handleMediaQueries = arr => {
  const isMQ = str => str.startsWith('@media');
  if (!arr.some(r => isMQ(r.key))) { return arr; }

  return arr.map(r => {
    if (!isMQ(r.key)) { return r; }

    const recurse = val => {
      return val.map(v => {
        return typeof v.value === 'object' ? ({key: v.key, value: recurse(v.value), query: r.key}) : v;
      });
    };

    return {
      key: r.key,
      value: recurse(r.value)
    };
  });
};

export const formatRule = styles => {
  return Format(prefixer(styles))
    .map(splitDeclarations)
    .map(handleArrays)
    .map(flattenArrays)
    .map(handleRecursion)
    .fold(handleMediaQueries);
};

