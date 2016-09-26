import React, { Component } from 'react';
import { render } from 'react-dom';
import readme from '../README.md';
import v from '../src/vudu';
import { atomics as a } from '../src/atomics';
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


class App extends Component {
  render() {
    const name = 'circle';
    const styles = v({
      wrapper: {
        overflow: 'hidden',
        fontFamily: '"CalibreRegular", Times',
        '@extend': [a.white, a.bgBlack]
      },
      banner: {
        textAlign: 'center',
        height: '50vh',
        '@extend': [a.blue],
        'h1': {
          fontSize: '6rem',
          fontWeight: 'normal',
          margin: 0,
          '@extend': [a.green],
        }
      },
      circle: {
        width: '1rem',
        height: '1rem',
        marginLeft: '0px',
        backgroundColor: 'fuchsia',
        borderRadius: '50%',
        animationName: name,
        animationDuration: '4s',
        animationIterationCount: 'infinite',
        [`@keyframes ${name}`]: {
          '0%': {
            marginLeft: '0px',
            width: '1rem',
            height: '1rem',
          },
          '50%': {
            marginLeft: '40px',
            width: '2rem',
            height: '2rem',
          }, 
          '100%': {
            marginLeft: '0px',
            width: '1rem',
            height: '1rem'
          }
        }
      },
      columns: {
        columnCount: '3',
        columnGap: '10px',
      }
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <h1>Vudu</h1>
        </div>
      </div>
    );
  }
}


render(
  <App />,
  document.getElementById('app')
);
