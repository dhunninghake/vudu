import React from 'react';
import v from '../../../dist/vudu';

const e = v.atomics;

export const TwoColumn = (props) => {
  const styles = v({
    container: {
      '@composes': [ 
        e.py5, 
        e.clearfix 
      ]
    },
    leftCol: {
      '@composes': [ 
        e.col12, 
        e.mdCol5, 
        e.left, 
        e.pr4 
      ]
    },
    rightCol: {
      '@composes': [ 
        e.p0, 
        e.col12, 
        e.mdCol7, 
        e.right, 
        e.clearfix 
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.pl4 ]
      },
      'p': {
        lineHeight: '1.45',
        '@composes': [ 
          e.h3, 
          e.mt0, 
          e.mb2 
        ]
      }
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.leftCol}>
        {props.leftCol}
      </div>
      <div className={styles.rightCol}>
        {props.rightCol}
      </div>
    </div>
  );
};