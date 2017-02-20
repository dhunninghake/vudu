import React, { Component } from 'react';
import { render } from 'react-dom';
import { ttf, woff, woff2 } from './fonts';
import { Logo, TwoColumn } from './components';
import { sharedStyles as shared } from './styles/shared';
import { sharedObj } from './styles/shared';
import pkg from '../../package.json';
import v from '../../dist/vudu';
import {
  Pseudos,
  MediaQueries,
  Keyframes,
  FontFace,
  Nesting } from './modules';

const e = v.composes;

const calibreRegular = v.addFontFace({  
  fontFamily: 'CalibreRegular',
  src: `url(${woff2}) format("woff2"),
    url(${woff}) format("woff"),
    url(${ttf}) format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'normal'
});

const tw = {
  root: 'https://twitter.com/intent/tweet',
  url:  'http://dhunninghake.com/vudu',
  text: 'Vudu',
};

const Wrapper = (props) => {
  const styles = v({
    wrapper: {
      maxWidth: '82rem',
      '@composes': [
        e.col10, 
        e.mxAuto, 
        e.clearfix, 
        e.px2
      ]
    }
  });
  return (
    <div className={styles.wrapper}>
      {props.children}
    </div>
  );
};


const Header = () => {
  const styles = v({
    header: {
      textAlign: 'center',
      backgroundColor: '#D4FD56',
      boxShadow: '0 0 0 .5rem #D4FD56',
    },
    title: {
      fontSize: '3.2rem',
      maxWidth: '30rem',
      lineHeight: '1.25',
      '@composes': [
        e.mxAuto,
        e.normal,
        e.mt1
      ]
    },
    nav: {
      listStyleType: 'none',
      '@composes': [ e.pt2, e.m0, e.rightAlign ],
      'li': {
        '@composes': [ e.mb1, e.inlineBlock, e.ml2 ],
        'a': {
          top: '2px',
          cursor: 'pointer',
          opacity: '1',
          transition: '.2s opacity ease',
          '@composes': [ 
            e.black, 
            e.relative 
          ],
          ':visited': {
            '@composes': [ e.black ]  
          },
          ':hover': {
            opacity: '.5'
          },
        }
      }
    }
  });
  return (
    <div className={styles.header}>
      <Wrapper>
        <ul className={styles.nav}>
          <li><a href='https://github.com/dhunninghake/vudu' target='_blank'>Github</a></li>
          <li><a href={`${tw.root}?text=${tw.text}&url=${tw.url}`} target='_blank'>Tweet</a></li>
          <li><a href='https://www.npmjs.com/package/vudu' target='_blank'>Npm</a></li>
        </ul>
        <div className={styles.top}>
          <Logo size={100} />
          <h1 className={styles.title}>{'Vudu is a composable approach to writing CSS in JavaScript.'}</h1>
        </div>
      </Wrapper>
    </div>
  );
};

// <div>
//   <h3>Composability</h3>
//   <p>Building blocks based on a styleguide that can be infinitely arranged</p>
//   <h3>Awareness of State</h3>
//   <p>Styles that adapt to data as it moves throughout the app</p>
//   <h3>Expressiveness</h3>
//   <p>Declarative styles that are intuitive and easy to reason about</p>
//   <h3>Simple Interface</h3>
//   <p>Minimal boilerplate and powerful out-of-the-box utilities</p>
//   <h3>Light and Fast</h3>
//   <p>Vudu is ~17kb minified and 6kb gzipped</p>
// </div>


const Footer = () => {
  const styles = v({
    footer: {
      backgroundColor: '#D4FD56',
      boxShadow: '0 0 0 .5rem #D4FD56',
      '@composes': [ 
        e.py3, 
        e.mt2 
      ],
      'a': {
        opacity: '1',
        transition: '.2s opacity ease',
        '@composes': [ 
          e.inlineBlock, 
          e.underline,
          e.mr1, 
          e.black
        ],
        ':hover': {
          opacity: '.5'
        }
      }
    },
    left: {
      '@composes': [ 
        sharedObj.middle,
        e.col12, 
        e.mdCol6, 
        e.center 
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.leftAlign ]
      }
    },
    right: {
      '@composes': [ 
        sharedObj.middle,
        e.col12, 
        e.mdCol6, 
        e.center
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.rightAlign ]
      }
    },
    logo: {
      '@composes': [ 
        sharedObj.middle,
        e.mr2
      ]
    },
    text: {
      '@composes': [ sharedObj.middle ],
      'span': {
        '@composes': [ 
          e.inlineBlock, 
          e.mr3 
        ]
      }
    },
  });
  return (
    <div className={styles.footer}>
      <Wrapper>
        <div className={styles.left}>
          <div className={styles.logo}>
            <Logo size={60} />
          </div>
          <div className={styles.text}>
            <p>
              <span>{`Vudu v${pkg.version}`}</span>
              <a href='https://github.com/dhunninghake/vudu' target='_blank'>Github</a>
              <a href={`${tw.root}?text=${tw.text}&url=${tw.url}`} target='_blank'>Tweet</a>
              <a href='https://www.npmjs.com/package/vudu' target='_blank'>Npm</a>
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <p>Made by <a href="http://dhunninghake.com">dhunninghake</a></p>
        </div>
      </Wrapper>
    </div>
  );
};


const Contribute = () => {
  const styles = v({
    container: {
      backgroundColor: '#f7f7f7',
      boxShadow: '0 0 0 .5rem #f7f7f7',
      color: '#888',
      '@composes': [ 
        e.py4, 
        e.center 
      ]
    },
    text: {
      '@composes': [ e.m0 ],
    },
    bit: {
      '@composes': [
        e.block,
        e.my1
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.inline ]
      }
    },
    button: {
      backgroundColor: '#888',
      borderRadius: '9999em',
      border: '0',
      padding: '.75rem 2rem',
      transition: 'background-color .2s ease',
      '@composes': [ 
        e.inlineBlock, 
        e.noUnderline, 
        e.white, 
        e.ml0,
        e.h4 
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.ml3 ]
      },
      ':hover': {
        backgroundColor: '#666'
      }
    }
  });
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        <span className={styles.bit}>Want to peek under the hood?</span> <span className={styles.bit}>Check out the code on Github.</span>
        <a href="https://github.com/dhunninghake/vudu" className={styles.button}>Contribute &rarr;</a>
      </p>
    </div>
  );
};


const Callout = () => {
  const styles = v({
    container: {
      borderLeft: '3px solid #ccc',
      backgroundColor: '#f6f6f6',
      '@composes': [ e.p3, e.mt4 ],
      'h2': {
        '@composes': [ e.normal, e.m0 ]
      }
    }
  });
  return (
    <div className={styles.container}>
      <h2>{'npm install vudu --save'}</h2>
    </div>
  );
};

class App extends Component {
  render() {
    const styles = v({
      site: {
        fontFamily: `${calibreRegular}, Times`,
        '*': { boxSizing: 'border-box' },
      }
    });
    return (
      <div className={styles.site}>
        <Header />
        <Wrapper>
          <Callout />
          <Pseudos />
          <MediaQueries />
          <Keyframes />
          <FontFace />
          <Nesting />
        </Wrapper>
        <Contribute />
        <Footer />
      </div>
    );
  }
}


render(
  <App />,
  document.getElementById('app')
);
