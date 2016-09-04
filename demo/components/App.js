import React, { Component } from 'react';
import readme from '../../README.md';
import v from '../../src/vudu';

const Readme = () => {
  const styles = v({
    container: {
      width: '41.66%',
    },
    readme: {
      '>> h1': {
        fontSize: '6rem',
        margin: 0,
      }
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.readme} dangerouslySetInnerHTML={{__html: readme}}></div>
    </div>
  );
};

export default class App extends Component {
  render() {
    const styles = v({
      wrapper: {
        width: '91.66%',
        margin: '0 auto',
        overflow: 'hidden',
        padding: '2rem',
      }
    });
    return (
      <div className={styles.wrapper}>
        <Readme />
      </div>
    );
  }
}
