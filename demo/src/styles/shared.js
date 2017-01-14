import React from 'react';
import v from '../../../dist/vudu';
import { i_ttf, i_woff, i_woff2 } from '../fonts';

const e = v.composes;

const Inconsolata = v.addFontFace({  
  fontFamily: 'Inconsolata',
  src: `url(${i_woff2}) format("woff2"),
    url(${i_woff}) format("woff"),
    url(${i_ttf}) format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'normal'
});

export const sharedStyles = v({
  example: {
    textAlign: 'right',
    '@media (min-width: 40em)': {
      textAlign: 'left',
      ':hover': {
        '@composes': [ e.caps ],
        textAlign: 'center',
        'span': {
          textAlign: 'right'
        }
      }
    },
    'span': {
      float: 'left'
    }
  },
  eyelash: {
    letterSpacing: '.2rem',
    '@composes': [ e.block, e.caps, e.h6, e.mb2 ],
    'span': {
      fontSize: '.5rem',
      '@composes': [ e.inline ]
    }
  },
  highlight: {
    lineHeight: '.55',
    borderBottom: '3px solid #D4FD56',
    '@composes': [ e.inlineBlock ]
  },
  codeContainer: {
    border: '1px solid #ddd',
    '@composes': [ e.mb4 ]
  },
  codeExecuted: {
    borderBottom: '1px solid #ddd',
    '@composes': [ e.p4 ],
    'p:last-child': {
      '@composes': [ e.m0 ]
    }
  },
  codeRaw: {
    'pre': {
      background: '#f7f7f7',
      '@composes': [ e.py4, e.pl4, e.m0, e.overflowScroll ]
    },
    'code': {
      lineHeight: '1.35',
      fontSize: '.7rem',
      fontFamily: `${Inconsolata}, monospace`,
    }
  },
  link: {
    opacity: '1',
    transition: 'all .2s ease',
    ':hover': {
      opacity: '.5'
    }
  }
});