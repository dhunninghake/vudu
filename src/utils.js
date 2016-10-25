export const guid = () => {
  return Math.random().toString(26).substring(2, 10) +
    Math.random().toString(26).substring(2, 10);
};

export const createSheet = (id) => {
  const existingSheet = document.getElementById(id);
  if (existingSheet) {
    return existingSheet.sheet;
  } else {
    let style = document.createElement('style');
    style.setAttribute('id', id);
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

