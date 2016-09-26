const defaultColors = {
  white:      '#ffffff',
  snow:       '#F9FAFC',
  snowDark:   '#EFF2F7',
  snowXDark:  '#E5E9F2',
  smoke:      '#E0E6ED',
  smokeDark:  '#D3DCE6',
  smokeXDark: '#C0CCDA',
  silver:     '#8492A6',
  slate:      '#3C4858',
  steel:      '#273444',
  black:      '#1F2D3D',
  trueBlack:  '#000000',
};


export const buildColors = (options) => {
  const colorClasses = {};
  const colors = options ? Object.assign({}, options.colors, defaultColors) : defaultColors;
  const capitalize = (s) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  Object.keys(colors).forEach(c => {
    colorClasses[c] = { color: colors[c] };
    colorClasses[`bg${capitalize(c)}`] = { backgroundColor: colors[c] };
    colorClasses[`border${capitalize(c)}`] = { borderColor: colors[c] };
    colorClasses[`stroke${capitalize(c)}`] = { stroke: colors[c] };
    colorClasses[`fill${capitalize(c)}`] = { fill: colors[c] };
  });  

  return colorClasses;
};