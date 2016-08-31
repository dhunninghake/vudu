export const camelToHyphen = (c) => {
  return c.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const guid = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

export const vStyleSheet = (() => {
  if (document.getElementById('vStyleSheet')) {
    return;
  } else {
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    style.setAttribute('id', 'vStyleSheet');
    document.head.appendChild(style);
    return style.sheet;
  }
})();