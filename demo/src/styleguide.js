import { v, config } from '../../dist/vudu';
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

export const colors = {
  red:   '#EF3241',
  smoke: '#232323',
  snow:  '#F8F8F8'
};

export const e = config({
  colors: colors
});