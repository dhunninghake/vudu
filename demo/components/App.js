import React, { Component } from 'react';
import readme from '../../README.md';
import v from '../../src/vudu';

const Readme = () => {
  const styles = v({
    container: {
      width: '50%'
    },
    readme: {
      'h1': {
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
    const name = 'circle';
    const styles = v({
      wrapper: {
        width: '91.66%',
        margin: '0 auto',
        overflow: 'hidden',
        padding: '2rem',
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
      }
    });
    return (
      <div className={styles.wrapper}>
        <Readme />
        <div className={styles.circle}></div>
      </div>
    );
  }
}
