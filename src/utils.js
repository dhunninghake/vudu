const kebab = s => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

export const guid = () => {
  return Math.random().toString(26).substring(2, 10) +
    Math.random().toString(26).substring(2, 10);
};

export const vendor = (str) => {
  if (str.startsWith('@keyframes')) { return str; }

  const vendored = /[A-Z]/.test(str[0]) ? `-${kebab(str)}` : kebab(str);

  return vendored.replace(/\[(.+?)\]/g, (string, first) => {
    return "["+(first.replace(/-([a-z])/g, (m, w) => w.toUpperCase()))+"]";
  });
};

export const createSheet = (id) => {
  const existingSheet = document.getElementById(id);
  if (existingSheet) { return existingSheet.sheet; }

  let style = document.createElement('style');
  style.setAttribute('id', id);
  document.head.appendChild(style);
  return style.sheet;
};
