import React from 'react';
import v from '../../../dist/vudu';
import { TwoColumn } from '../components';
import { sharedStyles as shared } from '../styles/shared';

const e = v.composes;

const rawCode = `import v from 'vudu';

const component = () = {
  const styles = v({
    keyframe: {
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      display: 'inline-block',
      backgroundColor: '#D4FD56',
      animationName: 'moveCircle',
      animationDuration: '3s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      '@keyframes moveCircle': {
        '50%': {
          marginLeft: '100px'
        },
        '100%': {
          marginLeft: '0px'
        }
      }
    }
  });
  return (
    <span className={styles.keyframe}></span>
  );  
};`;

export const Keyframes = () => {
  const styles = v({
    keyframe: {
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      display: 'inline-block',
      backgroundColor: '#D4FD56',
      animationName: 'moveCircle',
      animationDuration: '3s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      '@keyframes moveCircle': {
        '50%': {
          marginLeft: '100px'
        },
        '100%': {
          marginLeft: '0px'
        }
      }
    }
  });
  return (
    <div id="keyframes">
      <TwoColumn
        leftCol={(
          <span className={shared.eyelash}>{'@Keyframes'}</span>
        )}
        rightCol={(
          <div className={shared.codeContainer}>
            <div className={shared.codeExecuted}>
              <span className={styles.keyframe}></span>
            </div>
            <div className={shared.codeRaw}>
              <pre>
                <code>{rawCode}</code>
              </pre>
            </div>
          </div>
        )}/>
    </div>
  );
};