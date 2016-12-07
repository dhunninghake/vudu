import React from 'react';
import v from '../../../dist/vudu';
import { TwoColumn } from '../components';
import { sharedStyles as shared } from '../styles/shared';

const e = v.composes;

const rawCode = `import v from 'vudu';

const component = () = {
  const styles = v({
    list: {
      'li': {
        color: 'blue'
      },
      'li:last-child': {
        color: 'green',
        'span': {
          color: 'fuchsia',
          ':hover': {
            color: 'purple'
          }
        }
      }
    }
  });
  return (
    <ul className={styles.list}>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item <span>span</span></li>
    </ul>
  );  
};`;

export const Nesting = () => {
  const styles = v({
    list: {
      '@composes': [ e.h3 ],
      'li': {
        color: 'blue'
      },
      'li:last-child': {
        color: 'green',
        'span': {
          color: 'fuchsia',
          ':hover': {
            color: 'purple'
          }
        }
      }  
    }
  });
  return (
    <div id="nesting">
      <TwoColumn
        leftCol={(
          <span className={shared.eyelash}>{'Nesting rules'}</span>
        )}
        rightCol={(
          <div>
            <p>Rules can be nested arbitrarily deep.</p> 
            <div className={shared.codeContainer}>
              <div className={shared.codeExecuted}>
                <ul className={styles.list}>
                  <li>First item</li>
                  <li>Second item</li>
                  <li>Third item <span>span</span></li>
                </ul>
              </div>
              <div className={shared.codeRaw}>
                <pre>
                  <code>{rawCode}</code>
                </pre>
              </div>
            </div>
          </div>
        )}/>
    </div>
  );
};