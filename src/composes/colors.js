// from clrs.cc
const defaultColors = {
  white: '#ffffff',
  navy: '#001f3f',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144b',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  black: '#111111',
  gray: '#AAAAAA',
  silver: '#DDDDDD'
};

export const buildColors = options => {
  const color = {};
  const colors = options
    ? Object.assign({}, defaultColors, options.colors)
    : defaultColors;
  const capitalize = s => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  Object.keys(colors).forEach(c => {
    color[c] = { color: colors[c] };
    color[`bg${capitalize(c)}`] = { backgroundColor: colors[c] };
    color[`border${capitalize(c)}`] = { borderColor: colors[c] };
    color[`stroke${capitalize(c)}`] = { stroke: colors[c] };
    color[`fill${capitalize(c)}`] = { fill: colors[c] };
  });

  return color;
};
