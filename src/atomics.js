import { buildColors } from './atomics/colors';
import { buildWhitespace } from './atomics/whitespace';
import { buildTypography } from './atomics/typography';
import { buildPositioning } from './atomics/positioning';
import { buildLayout } from './atomics/layout';
import { buildGrid } from './atomics/grid';

const buildExtends = (options) => {
  return Object.assign({},
    buildColors(options),
    buildWhitespace(options),
    buildPositioning(),
    buildTypography(),
    buildLayout(),
    buildGrid(),
  );
};

export const atomics = buildExtends();
export const setupExtends = buildExtends;
export default buildExtends;