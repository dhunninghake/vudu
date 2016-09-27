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
        overflow: 'hidden',
        fontFamily: '"CalibreRegular", Times',
        '@extend': [e.blue, e.bgWheat, e.py4]
      },
      banner: {
        textAlign: 'center',
        height: '50vh',
        'h1': {
          fontSize: '6rem',
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
