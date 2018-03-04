import { buildColors } from './colors';
import { buildWhitespace } from './whitespace';
import { buildTypography } from './typography';
import { buildPositioning } from './positioning';
import { buildLayout } from './layout';
import { buildGrid } from './grid';

const buildComposes = options => {
  return {
    ...buildColors(options),
    ...buildWhitespace(options),
    ...buildGrid(options),
    ...buildPositioning(),
    ...buildTypography(),
    ...buildLayout(),
  };
};

export const composes = buildComposes();
export const config = buildComposes;
