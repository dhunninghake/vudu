import React from 'react';
import v from '../../../dist/vudu';

const e = v.composes;

export const Logo = (props) => {
  const keyframe = (options) => {
    return {
      animationName: options.name,
      animationDuration: options.duration,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      transformOrigin: options.origin,
      fill: 'currentColor',
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
      '@composes': [ e.relative ]
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
  });
  return (
    <svg className={styles.logoOuter} xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 80 80">
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
  );
};