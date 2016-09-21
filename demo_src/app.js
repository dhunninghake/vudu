import React, { Component } from 'react';
import { render } from 'react-dom';
import readme from '../README.md';
import v from '../src/vudu';
import { ttf, woff, woff2, eot } from './fonts';


const colors = {
  grey: '#36363b',
  yellow: '#eeb668',
}

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
        color: colors.grey,
        backgroundColor: colors.yellow,
        boxShadow: `0 0 0 1rem ${colors.yellow}`,
        overflow: 'hidden',
        transition: 'color 2s ease',
        boxSizing: 'border-box',
        fontFamily: '"CalibreRegular", Times',
        maxWidth: 'calc(100% - 300px)',
      },
      banner: {
        textAlign: 'center',
        height: '50vh',
        'h1': {
          fontSize: '6rem',
          fontWeight: 'normal',
          margin: 0,
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
