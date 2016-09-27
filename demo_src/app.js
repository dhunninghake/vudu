import React, { Component } from 'react';
import { render } from 'react-dom';
import readme from '../README.md';
import v from '../src/vudu';
import { e } from './styleguide';

console.log(e);

class App extends Component {
  render() {
    const name = 'circle';
    const styles = v({
      wrapper: {
        fontFamily: '"CalibreRegular", Times',
        'extend': [
          e.blue, 
          e.bgWheat, 
          e.py4, 
          e.overflowHidden
        ]
      },
      banner: {
        height: '50vh',
        'extend': [
          e.h0, 
          e.center
        ],
        'h1': {
          fontWeight: 'normal',
          margin: 0,
        }
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
