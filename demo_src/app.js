import React, { Component } from 'react';
import { render } from 'react-dom';
import readme from '../README.md';
import v from '../src/vudu';
import { e } from './styleguide';

class App extends Component {
  render() {
    const styles = v({
      wrapper: {
        minHeight: 'calc(100vh - 16px)',
        fontFamily: '"CalibreRegular", Times',
        'extend': [
          e.blue, 
          e.bgWheat,
        ]
      },
      floater: {
        'extend': [
          e.left,
          e.col6,
          e.mdCol3
        ]
      },
      clears: {
        'extend': [
          e.clearfix
        ]
      },
      banner: {
        'extend': [
          e.center,
          e.py4,
        ]
      },
      title: {
        'extend': [
          e.h0,
          e.normal
        ]
      }
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <h1 className={styles.title}>Vudu</h1>
          <div className={styles.clears}>
            <h2 className={styles.floater}>Cool1</h2>
            <h2 className={styles.floater}>Cool1</h2>
            <h2 className={styles.floater}>Cool1</h2>
            <h2 className={styles.floater}>Cool1</h2>
          </div>
        </div>
      </div>
    );
  }
}


render(
  <App />,
  document.getElementById('app')
);
