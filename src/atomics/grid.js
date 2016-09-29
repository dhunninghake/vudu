const breakpoints = {
  sm: '@media (min-width: 40em)',
  md: '@media (min-width: 52em)',
  lg: '@media (min-width: 64em)',
  xl: '@media (min-width: 76em)',
  xx: '@media (min-width: 88em)',
};

export const buildGrid = () => {
  const grid = [];
  const columnCount = 12;
  const columnClasses = {};
  
  const calculateWidth = (col) => {
    return (col / columnCount * 100).toFixed(2);
  };

  const setupGridValues = (() => {
    let count = 0;
    while (count < columnCount) {
      grid.push(`${calculateWidth(count)}%`);
      count++;
    }
  })();

  grid.forEach((column, i) => {
    columnClasses[`col${i}`] = { width: column };
  });

  Object.keys(breakpoints).forEach(b => {
    let count = 1;
    while (count < columnCount) {
      let mediaQuery = {};
      mediaQuery[breakpoints[b]] = { width: grid[count] };
      columnClasses[`${b}Col${count}`] = mediaQuery;
      count++;
    }
  });

  return columnClasses;
};

