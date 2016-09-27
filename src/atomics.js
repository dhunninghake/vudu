import { buildColors } from './atomics/colors';
import { buildWhitespace } from './atomics/whitespace';
import { buildTypography } from './atomics/typography';
import { buildLayout } from './atomics/layout';

const buildExtends = (options) => {
  return Object.assign({},
    buildColors(options),
    buildWhitespace(options),
    buildTypography(),
    buildLayout(),
  );
};

export const atomics = buildExtends();
export const setupExtends = buildExtends;
export default buildExtends;