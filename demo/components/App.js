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
        transition: 'color 2s ease',
        boxSizing: 'border-box',
      },
      flex: {
        display: 'flex',
      },
      flexLeft: {
        order: 1,
        width: '20%',
        backgroundColor: 'red',
        flex: 1,
      },
      flexMiddle: {
        order: 2,
        width: '60%',
        backgroundColor: 'blue',
      },
      flexRight: {
        order: 3,
        width: '20%',
        backgroundColor: 'green',
        flex: 1,
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
        <div className={styles.flex}>
          <div className={styles.flexLeft}>
            <h1>{'Left'}</h1>
          </div>
          <div className={styles.flexMiddle}>
            <Readme />
          </div>
          <div className={styles.flexRight}>
            <h1>{'Right'}</h1>
          </div>
        </div>
        <p className={styles.columns}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        <div className={styles.circle}></div>
      </div>
    );
  }
}
