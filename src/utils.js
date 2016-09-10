export const camelToHyphen = (c) => {
  return c.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const guid = () => {
  return Math.random().toString(26).substring(2, 10) +
    Math.random().toString(26).substring(2, 10);
};

export const createStyleSheet = () => {
  if (document.getElementById('vStyleSheet')) {
    return;
  } else {
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    style.setAttribute('id', 'vStyleSheet');
    document.head.appendChild(style);
    return style.sheet;
  }
};

export const deepEqual = (a, b) => {
  const isAobj = (typeof a === 'object');
  const isBobj = (typeof b === 'object');
  const isABobjs = (isAobj && isBobj);
  let out = (a === b);
  
  function checkX (x) {
    let ix, res;        
    for (ix in x) {
      if (x.hasOwnProperty(ix)) {
        res = deepEqual( a[ix], b[ix]);
      }
      if (!res) {
        break;
      }
    }
    return res;
  }
  if ( a && b && isABobjs && !out ) {
    out = checkX(a) && checkX(b);
  }
  return out;
};