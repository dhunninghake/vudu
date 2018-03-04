const breakpoints = {
  sm: '@media (min-width: 40em)',
  md: '@media (min-width: 52em)',
  lg: '@media (min-width: 64em)',
  xl: '@media (min-width: 76em)',
  xx: '@media (min-width: 88em)',
};

function setupGridValues(count) {
  const gridArr = [];
  for (let i = 1; i < count + 1; i++) {
    gridArr.push(`${(i / count * 100).toFixed(2)}%`);
  }
  return gridArr;
}

function createColumns(grid) {
  const columns = {};
  grid.forEach((column, i) => (columns[`col${i + 1}`] = { width: column }));
  return columns;
}

function addBreakpoints(columns, count, grid) {
  Object.keys(breakpoints).forEach(b => {
    for (let i = 0; i < count; i++) {
      let mediaQuery = {};
      mediaQuery[breakpoints[b]] = { width: grid[i] };
      columns[`${b}Col${i + 1}`] = mediaQuery;
    }
  });
}

export const buildGrid = options => {
  const count = options && options.columns ? options.columns : 12;
  const grid = setupGridValues(count);
  const columns = createColumns(grid);
  addBreakpoints(columns, count, grid);
  return columns;
};
