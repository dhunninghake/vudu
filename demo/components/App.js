import React, { Component } from 'react';
import v from '../../src/vudu';

export default class App extends Component {
  render() {
    const styles = v({
      container: {
        textAlign: 'center',
        '>> h1': {
          color: 'red'
        }
      }
    });
    return (
      <div className={styles.container}>
        <h1>Vudu!</h1>
      </div>
    );
  }
}
