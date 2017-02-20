import React from 'react';
import v from '../../../dist/vudu';

const e = v.composes;

export const sharedObj = {
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
      fontFamily: 'monospace',
    }
  },
  link: {
    opacity: '1',
    transition: 'all .2s ease',
    ':hover': {
      opacity: '.5'
    }
  },
  middle: {
    '@composes': [
      e.inlineBlock,
      e.alignMiddle
    ]
  }
};

export const sharedStyles = v(sharedObj);