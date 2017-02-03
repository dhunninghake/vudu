import React, { Component } from 'react';
import { render } from 'react-dom';
import { c_ttf, c_woff, c_woff2 } from './fonts';
import { Logo, TwoColumn } from './components';
import { sharedStyles as shared } from './styles/shared';
import pkg from '../../package.json';
import v from '../../dist/vudu';
import { 
  Introduction, 
  Pseudos,
  MediaQueries,
  Keyframes,
  FontFace,
  Nesting } from './modules';

const e = v.composes;

const calibreRegular = v.addFontFace({  
  fontFamily: 'CalibreRegular',
  src: `url(${c_woff2}) format("woff2"),
    url(${c_woff}) format("woff"),
    url(${c_ttf}) format("truetype")`,
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
      maxWidth: '64rem',
      '@composes': [
        e.col12, 
        e.mxAuto, 
        e.clearfix, 
        e.px2 
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.p0 ]
      }
    }
  });
  return (
    <div className={`${styles.wrapper} ${props.styles}`}>
      {props.children}
    </div>
  );
};


const Header = () => {
  const styles = v({
    header: {
      '@composes': [ 
        e.pt4,
        e.pb3
      ],
      backgroundColor: '#D4FD56',
      boxShadow: '0 0 0 .5rem #D4FD56',
    },
    top: {
      '@composes': [ e.center ]
    },
    description: {
      fontSize: '2.4rem',
      lineHeight: '1.35',
      '@composes': [ 
        e.normal, 
        e.m0, 
        e.pb4 
      ],
      '@media (min-width: 52em)': {
        '@composes': [ e.pb0 ]
      }
    },
    nav: {
      '@composes': [ e.pt1 ],
      'ul': {
        listStyleType: 'none',
        '@composes': [ 
          e.p0, 
          e.m0 
        ]
      }
    },
    navCol: {
      '@composes': [ 
        e.left, 
        e.col6, 
        e.mdCol4 
      ],
      'li': {
        '@composes': [ e.mb1 ],
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
        <div className={styles.top}>
          <Logo size={100} />
        </div>
        <TwoColumn
          leftCol={(
            <p className={styles.description}>{'Vudu is a composable approach to writing CSS in JavaScript.'}</p>  
          )}
          rightCol={(
            <div className={styles.nav}>
              <div className={styles.navCol}>
                <span className={shared.eyelash}>{'Featureset'}</span>
                <ul className={styles.navList}>
                  <li><a href="#pseudo-selectors">Pseudo selectors</a></li>
                  <li><a href="#media-queries">Media queries</a></li>
                  <li><a href="#keyframes">@keyframes</a></li>
                  <li><a href="#fontface">@font-face</a></li>
                  <li><a href="#nesting">Nesting rules</a></li>
                </ul>
              </div>
              <div className={styles.navCol}>
                <span className={shared.eyelash}>{'Composability'}</span>
                <ul className={styles.navList}>
                  <li><a href="#composability-docs">Layout</a></li>
                  <li><a href="#composability-docs">Positioning</a></li>
                  <li><a href="#composability-docs">Typography</a></li>
                  <li><a href="#composability-docs">Whitespace</a></li>
                  <li><a href="#composability-docs">Colors</a></li>
                  <li><a href="#composability-docs">Grid</a></li>
                </ul>
              </div>
              <div className={styles.navCol}>
                <span className={shared.eyelash}>{'Internet'}<span>&#8599;</span></span>
                <ul className={styles.navList}>
                  <li><a href='https://github.com/dhunninghake/vudu' target='_blank'>Github</a></li>
                  <li><a href={`${tw.root}?text=${tw.text}&url=${tw.url}`} target='_blank'>Tweet</a></li>
                  <li><a href='https://www.npmjs.com/package/vudu' target='_blank'>Npm</a></li>
                </ul>
              </div>
            </div>
          )}/>
      </Wrapper>
    </div>
  );
};


const Footer = () => {
  const middle = {
    '@composes': [
      e.inlineBlock,
      e.alignMiddle
    ]
  };
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
        middle, 
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
        middle, 
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
        middle, 
        e.mr2
      ]
    },
    text: {
      '@composes': [ middle ],
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
      backgroundColor: '#f7f7f7',
      boxShadow: '0 0 0 .5rem #f7f7f7',
      color: '#999',
      '@composes': [ 
        e.py2, 
        e.center 
      ]
    },
    tag: {
      border: '1px solid #999',
      borderRadius: '.5rem',
      fontSize: '1.25rem',
      color: '#888',
      '@composes': [ 
        e.inlineBlock, 
        e.py1, 
        e.px3 
      ],
      'span': {
        top: '2px',
        '@composes': [ e.relative ]
      }
    }
  });
  return (
    <div className={styles.container}>
      <p className={styles.tag}>
        <span>{'npm install vudu --save'}</span>
      </p>
    </div>
  );
};


const Composability = () => {
  const styles = v({
    container: {
      border: '1px solid #ddd',
      '@composes': [ 
        e.my5, 
        e.py5, 
        e.center 
      ],
      'h2': {
        '@composes': [ 
          e.normal, 
          e.m0 
        ]
      }
    }
  });
  return (
    <div id='composability-docs' className={styles.container}>
      <h2>{'Composability docs coming soon!'}</h2>
    </div>
  );
};


class App extends Component {
  render() {
    const styles = v({
      site: {
        fontFamily: `${calibreRegular}, Times`,
        '*': { boxSizing: 'border-box' },
      },
      wrapper: {
        '@composes': [ e.py4 ]
      }
    });
    return (
      <div className={styles.site}>
        <Header />
        <Callout />
        <Wrapper styles={styles.wrapper}>
          <Introduction />
          <Pseudos />
          <MediaQueries />
          <Keyframes />
          <FontFace />
          <Nesting />
          <Composability />
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
