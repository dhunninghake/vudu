import { buildColors } from './atomics/colors';
import { buildWhitespace } from './atomics/whitespace';

let buildExtends = function(options) {
  return Object.assign({},
    buildColors(options),
    buildWhitespace(options)
  );
};

export const atomics = buildExtends();
export const setupExtends = buildExtends;
export default buildExtends;