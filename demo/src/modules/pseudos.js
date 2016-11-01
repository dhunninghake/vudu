import React from 'react';
import v from '../../../dist/vudu';
import { TwoColumn } from '../components';
import { sharedStyles as shared } from '../styles/shared';

const e = v.atomics;

const rawCode = `import v from 'vudu';

const component = () = {
  const styles = v({
    hover: {
      ':hover': {
        color: 'red'
      }
    },
    before: {
      ':before': {
        content: '"☺"'
      }
    },
    active: {
      ':active': {
        color: 'green'
      }
    }
  });
  return (
    <div>
      <p className={styles.hover}>:hover</p>
      <p className={styles.before}>:before</p>
      <p className={styles.active}>:active</p>
    </div>
  );  
};`;

export const Pseudos = () => {
  const styles = v({
    hover: {
      cursor: 'pointer',
      ':hover': {
        color: 'red'
      }
    },
    before: {
      ':before': {
        content: '"☺"',
        position: 'relative',
        top: '2px'
      }
    },
    active: {
      cursor: 'pointer',
      ':active': {
        color: 'green'
      }
    }
  });
  return (
    <div id="pseudo-selectors">
      <TwoColumn
        leftCol={(
          <span className={shared.eyelash}>{'Pseudo selectors'}</span>
        )}
        rightCol={(
          <div>
            <p>All pseudo selectors are supported.</p>
            <div className={shared.codeContainer}>
              <div className={shared.codeExecuted}>
                <p className={styles.hover}>:hover</p>
                <p className={styles.before}>:before</p>
                <p className={styles.active}>:active</p>
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