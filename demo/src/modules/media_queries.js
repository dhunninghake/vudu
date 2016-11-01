import React from 'react';
import v from '../../../dist/vudu';
import { TwoColumn } from '../components';
import { sharedStyles as shared } from '../styles/shared';

const e = v.atomics;

const rawCode = `import v from 'vudu';

const component = () = {
  const styles = v({
    column: {
      ':before': {
        content: '"Mobile (default)"'
      },
      '@media (min-width: 48em)': {
        ':before': {
          content: '"Small (min-width: 48em)"'
        }
      },
      '@media (min-width: 60em)': {
        ':before': {
          content: '"Medium (min-width: 60em)"'
        }
      },
      '@media (min-width: 72em)': {
        ':before': {
          content: '"Large (min-width: 72em)"'
        }
      }
    }
  });
  return (
    <div className={styles.column}></div>
  );  
};`;

export const MediaQueries = () => {
  const styles = v({
    column: {
      ':before': {
        '@composes': [ e.h3 ],
        content: '"Mobile (default)"'
      },
      '@media (min-width: 48em)': {
        ':before': {
          content: '"Small (min-width: 48em)"'
        }
      },
      '@media (min-width: 60em)': {
        ':before': {
          content: '"Medium (min-width: 60em)"'
        }
      },
      '@media (min-width: 72em)': {
        ':before': {
          content: '"Large (min-width: 72em)"'
        }
      }
    }
  });
  return (
    <div id="media-queries">
      <TwoColumn
        leftCol={(
          <span className={shared.eyelash}>{'Media queries'}</span>
        )}
        rightCol={(
          <div>
            <p>Adjust your browser window to see the text change.</p>
            <div className={shared.codeContainer}>
              <div className={shared.codeExecuted}>
                <div className={styles.column}></div>
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