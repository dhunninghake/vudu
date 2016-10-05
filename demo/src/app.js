import React, { Component } from 'react';
import { render } from 'react-dom';
import { v } from '../../dist/vudu';
import { e, colors } from './styleguide';

class App extends Component {
  render() {
    const styles = v({
      wrapper: {
        minHeight: 'calc(100vh - 20px)',
        boxShadow: `0 0 0 10px ${colors.snow}`,
        fontFamily: '"CalibreRegular", Times',
        '@composes': [
          e.smoke,
          e.bgSnow
        ]
      },
      logoOuter: {
        '@composes': [
          e.inlineBlock,
          e.relative
        ]
      },
      logo1Inner: {
        animationName: 'inner',
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: '40px 40px',
        fill: 'rgba(239,50,65,.9)',
        ['@keyframes inner']: {
          '0%': {
            transform: 'rotateZ(0deg) translateY(20px) scale(.575)'
          },
          '100%': {
            transform: 'rotateZ(-360deg) translateY(20px) scale(.575)'
          }
        }
      },
      logo1InnerInner: {
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
      logo2Inner: {
        animationName: 'inner2',
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: '53px 53px',
        fill: 'rgba(239,50,65,.9)',
        ['@keyframes inner2']: {
          '0%': {
            transform: 'rotateZ(0deg) translateY(20px) scale(.75)'
          },
          '100%': {
            transform: 'rotateZ(-360deg) translateY(20px) scale(.75)'
          }
        }
      },
      logo2InnerInner: {
        animationName: 'innerinner2',
        animationDuration: '8s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: 'center',
        ['@keyframes innerinner2']: {
          '0%': {
            transform: 'rotateZ(0deg)'
          },
          '100%': {
            transform: 'rotateZ(360deg)'
          }
        }
      },
      logo3Inner: {
        animationName: 'inner3',
        animationDuration: '5s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: '35px 35px',
        fill: 'rgba(239,50,65,.9)',
        ['@keyframes inner3']: {
          '0%': {
            transform: 'rotateZ(0deg) translateY(25px) scale(.4)'
          },
          '100%': {
            transform: 'rotateZ(360deg) translateY(25px) scale(.4)'
          }
        }
      },
      logo3InnerInner: {
        animationName: 'innerinner3',
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        transformOrigin: 'center',
        ['@keyframes innerinner3']: {
          '0%': {
            transform: 'rotateZ(0deg)'
          },
          '100%': {
            transform: 'rotateZ(-360deg)'
          }
        }
      },
      floater: {
        '@composes': [
          e.left,
          e.col6,
          e.mdCol3
        ]
      },
      clears: {
        '@composes': [
          e.clearfix
        ]
      },
      banner: {
        height: '100%',
        '@composes': [
          e.py4,
          e.col3,
          e.fixed,
          e.top0,
          e.left0,
          e.center,
          e.bgWhite
        ]
      },
      title: {
        fontSize: '2.5rem',
        '@composes': [
          e.normal,
          e.m0,
          e.red
        ]
      }
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          <div className={styles.logoOuter}>
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
              <g className={styles.logo1Inner}>
                <path className={styles.logo1InnerInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
              </g>
              <g className={styles.logo2Inner}>
                <path className={styles.logo2InnerInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
              </g>
              <g className={styles.logo3Inner}>
                <path className={styles.logo3InnerInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
              </g>
            </svg>
          </div>
          <h1 className={styles.title}>Vudu</h1>
        </div>
      </div>
    );
  }
}


render(
  <App />,
  document.getElementById('app')
);
