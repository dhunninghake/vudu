import React, { Component } from 'react';
import { render } from 'react-dom';
import { v } from '../../dist/vudu';
import { e, colors } from './styleguide';


const Logo = () => {
  const keyframe = (options) => {
    return {
      animationName: options.name,
      animationDuration: options.duration,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      transformOrigin: options.origin,
      '@composes': [ e.fillRed ],
      [`@keyframes ${options.name}`]: {
        '0%': {
          transform: options.start
        },
        '100%': {
          transform: options.finish
        }
      }
    };
  };
  const styles = v({
    logoOuter: {
      '@composes': [
        e.inlineBlock,
        e.relative
      ]
    },
    starOneOuter: keyframe({
      name: 'starOneOuter',
      duration: '5s',
      origin: '41px 41px',
      start: 'rotateZ(0deg) translateY(7px) scale(.575)',
      finish: 'rotateZ(-360deg) translateY(7px) scale(.575)'
    }),
    starOneInner: keyframe({
      name: 'starOneInner',
      duration: '2s',
      origin: 'center',
      start: 'rotateZ(0deg)',
      finish: 'rotateZ(360deg)'
    }),
    starTwoOuter: keyframe({
      name: 'starTwoOuter',
      duration: '5s',
      origin: '53px 53px',
      start: 'rotateZ(0deg) translateY(3px) scale(.75)',
      finish: 'rotateZ(-360deg) translateY(3px) scale(.75)'
    }),
    starTwoInner: keyframe({
      name: 'starTwoInner',
      duration: '8s',
      origin: 'center',
      start: 'rotateZ(0deg)',
      finish: 'rotateZ(360deg)'
    }),
    starThreeOuter: keyframe({
      name: 'starThreeOuter',
      duration: '5s',
      origin: '35px 35px',
      start: 'rotateZ(0deg) translateY(13px) scale(.4)',
      finish: 'rotateZ(360deg) translateY(13px) scale(.4)'
    }),
    starThreeInner: keyframe({
      name: 'starThreeInner',
      duration: '1s',
      origin: 'center',
      start: 'rotateZ(0deg)',
      finish: 'rotateZ(-360deg)'
    }),
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
    <div>
      <svg className={styles.logoOuter} xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
        <g className={styles.starOneOuter}>
          <path className={styles.starOneInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
        </g>
        <g className={styles.starTwoOuter}>
          <path className={styles.starTwoInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
        </g>
        <g className={styles.starThreeOuter}>
          <path className={styles.starThreeInner} d="M40 60C40 49 31 40 20 40 31 40 40 31 40 20 40 31 49 40 60 40 49 40 40 49 40 60Z"/>
        </g>
      </svg>
      <h1 className={styles.title}>Vudu</h1>
    </div>
  );
};


const Sidebar = () => {
  const styles = v({
    container: {
      height: '100%',
      '@composes': [
        e.py3,
        e.col3,
        e.fixed,
        e.top0,
        e.left0,
        e.center,
        e.bgWhite
      ]
    },
    tagline: {
      '@composes': [
        e.col6,
        e.mxAuto,
        e.gray,
        e.h5,
        e.mt0,
        e.pb2
      ],
    },
    list: {
      borderTop: '1px solid #eee',
      '@composes': [
        e.p0,
        e.mt4,
        e.leftAlign,
        e.smoke
      ],
      'li': {
        borderBottom: '1px solid #eee',
        '@composes': [
          e.px3
        ]
      },
      'li h3': {
        top: '3px',
        '@composes': [
          e.normal,
          e.smoke,
          e.my3,
          e.relative
        ]
      }
    }
  });

  return (
    <div className={styles.container}>
      <Logo />
      <p className={styles.tagline}>{'A composable approach to writing styles in JavaScript'}</p>
      <ul className={styles.list}>
        <li>
          <h3>Introduction</h3>
        </li>
        <li>
          <h3>Getting Started</h3>
        </li>
        <li>
          <h3>Docs</h3>
        </li>
        <li>
          <h3>Contribute!</h3>
        </li>
      </ul>
    </div>
  );
};

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
      clear: {
        '@composes': [
          e.col9,
          e.right,
          e.clearfix
        ]
      },
      floater: {
        '@composes': [
          e.left,
          e.col6,
          e.mdCol3
        ]
      }      
    });
    return (
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.clear}>
          <div className={styles.floater}>1</div>
          <div className={styles.floater}>2</div>
          <div className={styles.floater}>3</div>
          <div className={styles.floater}>4</div>
        </div>
      </div>
    );
  }
}


render(
  <App />,
  document.getElementById('app')
);
