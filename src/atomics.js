import { buildColors } from './atomics/colors';

let buildExtends = function(options) {
  return buildColors(options);
};

export const atomics = buildExtends();
export const setupExtends = buildExtends;
export default buildExtends;