import { capitalize } from '../utils';

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
  silver: '#DDDDDD',
};

export const buildColors = options => {
  const allColors = {
    ...defaultColors,
    ...(options ? options.colors : {}),
  };

  return Object.keys(allColors).reduce((a, b) => {
    return {
      ...a,
      ...{
        [b]: { color: allColors[b] },
        [`hover${capitalize(b)}`]: { ':hover': { color: allColors[b] } },
        [`bg${capitalize(b)}`]: { backgroundColor: allColors[b] },
        [`border${capitalize(b)}`]: { borderColor: allColors[b] },
        [`stroke${capitalize(b)}`]: { stroke: allColors[b] },
        [`fill${capitalize(b)}`]: { fill: allColors[b] },
      },
    };
  }, {});
};
