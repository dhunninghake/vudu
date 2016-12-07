import React from 'react';
import v from '../../../dist/vudu';
import introduction from './introduction.md';
import { sharedStyles as shared } from '../styles/shared';
import { TwoColumn } from '../components';

const e = v.composes;

export const Introduction = () => {
  const styles = v({
    intro: {
      'p:first-child': {
        borderBottom: '1px solid #ddd',
        '@composes': [ e.pb4 ]
      },
      'p:not(:first-child)': {
        borderBottom: '1px solid #ddd',
        '@composes': [ 
          e.pb2,
          e.h4 
        ]
      },
      'h3': {
        left: '-1.1rem',
        '@composes': [ 
          e.normal,
          e.relative, 
          e.m0, 
          e.pt1,
          e.h3 
        ],
        ':before': {
          content: '"♦"',
          fontSize: '.4rem',
          marginRight: '.5rem',
          top: '-2px',
          '@composes': [ 
            e.inlineBlock, 
            e.relative
          ]
        },
      }
    }
  });
  return (
    <TwoColumn
      leftCol={(
        <span className={shared.eyelash}>{'Introduction'}</span>
      )}
      rightCol={(
        <div className={styles.codeBlock}>
          <div className={styles.intro} dangerouslySetInnerHTML={{__html: introduction}}></div>
        </div>
      )}/>
  );
};