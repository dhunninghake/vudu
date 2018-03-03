const kebabCase = s => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const camelCase = s => s.replace(/-([a-z])/g, (m, w) => w.toUpperCase());

export const vendor = str => {
  if (str.startsWith('@keyframes')) {
    return str;
  }

  const isFirstLetterCapitalized = /[A-Z]/.test(str[0]);
  const vendored = isFirstLetterCapitalized
    ? `-${kebabCase(str)}`
    : kebabCase(str);

  return vendored.replace(/\[(.+?)\]/g, insideBrackets => {
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
