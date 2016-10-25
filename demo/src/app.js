import React, { Component } from 'react';
import { render } from 'react-dom';
import { ttf, woff, woff2 } from './fonts';
import v from '../../dist/vudu';

const e = v.atomics;

const calibreRegular = v.addFontFace({  
  fontFamily: 'CalibreRegular',
  src: `url(${woff2}) format("woff2"),
    url(${woff}) format("woff"),
    url(${ttf}) format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'normal'
});


const Logo = () => {
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
    logoWrapper: {
      '@composes': [ 
        e.py3
      ]
    },
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
        e.bgRed,
        e.normal,
        e.m0,
      ],
      ':hover': {
        '@composes': [
          e.bgBlue
        ],
        'span': {
          '@composes': [
            e.green
          ]
        }
      }
    },
    tagline: {
      '@composes': [
        e.col6,
        e.mxAuto,
        e.gray,
        e.h5,
        e.mt0,
        e.pb2,
        e.block
      ],
    }
  });
  return (
    <div className={styles.logoWrapper}>
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
      <h1 className={styles.title}>
        <span>Vudu</span>
      </h1>
      <span className={styles.tagline}>{'A composable approach to writing styles in JavaScript'}</span>
    </div>
  );
};


const Sidebar = (props) => {
  const styles = v({
    container: {
      height: '100%',
      '@composes': [
        e.col3,
        e.fixed,
        e.top0,
        e.left0,
        e.center,
        e.bgWhite
      ]
    },
    list: {
      '@composes': [
        e.pt3,
        e.pl0,
        e.m0,
        e.leftAlign,
      ],
    },
    listItem: {
      top: '3px',
      '@composes': [
        e.normal,
        e.py1,
        e.px4,
        e.relative,
        e.block,
        e.h2,
        e.noUnderline,
      ]
    }
  });

  const renderListItems = () => {
    const items = [
      { name: 'Introduction', link: '#introduction' },
      { name: 'Getting Started', link: '#getting-started' },
      { name: 'Docs', link: '#docs' },
      { name: 'Contribute', link: '#contribute' }
    ];
    return items.map((item, index) => {
      const isActive = props.activeItem === item.name;
      const activeStyles = v({
        active: {
          ':after': {
            content: '" "',
            borderRadius: '50%',
            width: '8px',
            height: '8px',
            top: '50%',
            transform: 'translateY(-5px)',
            right: '-4px',
            '@composes': [
              e.absolute,
              e.block,
              e.z1
            ]
          }
        }
      });
      return (
        <li key={index} onClick={props.changeActiveItem.bind(this, item.name)}>
          <a className={`${styles.listItem} ${isActive ? activeStyles.active : ''}`} href={item.link}>{item.name}</a>
        </li>
      );
    });
  };
  return (
    <div className={styles.container}>
      <Logo />
      <ul className={styles.list}>
        {renderListItems()}
      </ul>
    </div>
  );
};

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Introduction'
    }
  }

  changeActiveItem(item) {
    this.setState({
      activeItem: item
    });
  }

  render() {
    const styles = v({
      wrapper: {
        minHeight: 'calc(100vh - 20px)',
        fontFamily: `${calibreRegular}, Times`,
        'p': {
          lineHeight: '1.4',
          '@composes': [
            e.h3
          ]
        }
      },
      clear: {
        '@composes': [
          e.col9,
          e.right,
          e.clearfix
        ]
      },
      container: {
        '@composes': [
          e.mxAuto,
          e.col12,
          e.mdCol8,
          e.pt5
        ]
      },
      sectionHeader: {
        fontSize: '2.5rem',
        '@composes': [
          e.normal
        ]
      }
    });
    return (
      <div className={styles.wrapper}>
        <Sidebar 
          activeItem={this.state.activeItem} 
          changeActiveItem={this.changeActiveItem.bind(this)}
        />
        <div className={styles.clear}>
          <div className={styles.container}>
            <h1 className={styles.sectionHeader}>Introduction</h1>
            <p>Mr. Trump lol</p>
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
