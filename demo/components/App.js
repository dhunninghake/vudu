import React, { Component } from 'react';
import v from '../../src/vudu';

export default class App extends Component {
  render() {
    const styles = v({
      container: {
        textAlign: 'center',
        '>> h1': {
          color: 'red',
          transition: 'color 1s ease'
        },
        '>> h2': {
          color: 'blue'
        },
      },
      headline: {
        ':hover': {
          color: 'green'
        }
      }
    });
    return (
      <div className={styles.container}>
        <h1 className={styles.headline}>Vudu!</h1>
        <h2>rocks!</h2>
      </div>
    );
  }
}
