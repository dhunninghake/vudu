import React, { Component } from 'react';
import { render } from 'react-dom';
import { v } from '../../dist/vudu';
import { e, colors } from './styleguide';

class App extends Component {
  render() {
    const styles = v({
      wrapper: {
        minHeight: 'calc(100vh - 16px)',
        boxShadow: `0 0 0 10px ${colors.wheat}`,
        fontFamily: '"CalibreRegular", Times',
        '@extend': [
          e.blue,
          e.bgWheat,
        ]
      },
      logoOuter: {
        '@extend': [
          e.inlineBlock,
          e.relative
        ]
      },
      logoInner: {
        animationName: 'inner',
        animationDuration: '4s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: '40px 40px',
        '@extend': [
          e.fillBlue
        ],
        ['@keyframes inner']: {
          '0%': {
            transform: 'rotateZ(0deg) translateY(20px) scale(.5)'
          },
          '100%': {
            transform: 'rotateZ(-360deg) translateY(20px) scale(.5)'
          }
        }
      },
      logoInnerInner: {
        animationName: 'innerinner',
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: 'center',
        ['@keyframes innerinner']: {
          '0%': {
            transform: 'rotateZ(0deg)'
          },
          '100%': {
            transform: 'rotateZ(360deg)'
          }
        }
      },
      floater: {
        '@extend': [
          e.left,
          e.col6,
          e.mdCol3
        ]
      },
      clears: {
        '@extend': [
          e.clearfix
        ]
      },
      banner: {
        '@extend': [
          e.py4,
          e.center
        ]
      },
      title: {
        '@extend': [
          e.h0,
          e.normal,
          e.mt1
        ]
      }
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.logoOuter}>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
              <g className={styles.logoInner}>
                <path className={styles.logoInnerInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
              </g>
            </svg>
          </div>
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
