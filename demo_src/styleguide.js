import v from '../src/vudu';
import vuduExtends from '../src/atomics';
import { ttf, woff, woff2, eot } from './fonts';

v({
  calibre: {
    '@font-face': {
      fontFamily: 'CalibreRegular',
      sources: [
        { path: eot, format: 'embedded-opentype' },
        { path: woff2, format: 'woff2' },
        { path: woff, format: 'woff' },
        { path: ttf, format: 'truetype' },
      ],
      fontWeight: 'normal',
      fontStyle: 'normal'
    }
  }
});

export const e = vuduExtends({
  colors: {
    red: 'red',
    blue: 'blue'
  }
});