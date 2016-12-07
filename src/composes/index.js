import { buildColors } from './composes/colors';
import { buildWhitespace } from './composes/whitespace';
import { buildTypography } from './composes/typography';
import { buildPositioning } from './composes/positioning';
import { buildLayout } from './composes/layout';
import { buildGrid } from './composes/grid';

const buildComposes = (options) => {
  return Object.assign({},
    buildColors(options),
    buildWhitespace(options),
    buildGrid(options),
    buildPositioning(),
    buildTypography(),
    buildLayout(),
  );
};

export const composes = buildComposes();
export const config = buildComposes;

