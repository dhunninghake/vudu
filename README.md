# ✨Vudu
A composable approach to writing styles in JavaScript

## Features
* Supports media queries
* Supports pseudo selectors `:hover`, `:active`, etc
* Generates animation sequences with @keyframes
* Provides configurable, immutable style utilities out of the box
* Plays nice with or without popular frameworks like React, Ember, and Angular
* Generates necessary styles at runtime
* No external stylesheets to include, no duplicate rulesets
* Can be used with server-side rendering
* Lightweight (18kb minified, 6kb gzipped)
* Only one dependency
* Autoprefixes styles
* Author **dynamic** and **stateful** styles with JS!

## Getting Started
```bash
npm install vudu --save
```
```javascript
// UI component usage
import React from 'react';
import v from 'vudu';

const exampleComponent = () => {
  const styles = v({
    someColor: {
      color: 'red',
      ':hover': {
        color: 'green'
      }
    },
    somePadding: {
      padding: '2rem'
    },
    someColumns: {
      width: '100%',
      '@media (min-width: 40em)': {
        width: '50%'
      },
      '@media (min-width: 52em)': {
        width: '33%'
      },
      '@media (min-width: 64em)': {
        width: '25%'
      }
    }
  });
  return (
    <section>
      // v creates strings to be used as classnames
      // that represent the objects above
      <div className={styles.someColor}>
        <p>{'This is red and turns green on hover'}</p>
      </div>
      <div className={styles.somePadding}>
        <p>{'This has a padding of 2rem around the outside'}</p>
      </div>
      <div className={styles.someColumns}>
        <p>{'Full width on mobile, 1/2 width on small breakpoint, 1/3 on medium, 1/4 on large'}</p>
      </div>
    </section>
  );
}
```

## Composability FTW!
One of the key features of Vudu is the ability to compose POJOs and use them within the context of other objects. In other words, setup styles that can be used in multiple places, and then compose them wherever you want. Here’s what that might look like in practice:

```javascript
import v from 'vudu';

const buttonStyles = {
  base: {
    color: 'blue',
    height: '2.5em',
    padding: '1em 1.5em',
    fontSize: '1.25rem',
    display: 'inline-block',
    verticalAlign: 'middle',
    textDecoration: 'none',
    // ...
  },
  large: {
    fontSize: '2em',
    padding: '1.5em 1em',
    height: '3.25em'
  },
  grey: {
    color: 'grey'
  },
  blue: {
    color: 'blue'
  },

};

// compose with the '@composes' key
const styles = v({
  button: {
    '@composes': [ 
      buttonStyles.base,
      buttonStyles.large,
      this.props.disabled ? buttonStyles.grey : buttonStyles.blue
    ],
    'color': 'red', // to override composes
  }
});
```

Why call it @composes, you ask? It’s inspired by CSS Modules, which you can read about [here](https://github.com/css-modules/css-modules#composition).


## @font-face
Use all formats for greatest compatibility, however it will work as long as at least one source is declared. Keep in mind that the path to the file is relative to the HTML file where the stylesheet is loaded.

```javascript
const CalibreRegular = v.addFontFace({  
  fontFamily: 'CalibreRegular',
  src: `url(/path/to/file.eot) format("eot"),
    url(/path/to/file.woff2) format("woff2"),
    url(/path/to/file.woff) format("woff"),
    url(/path/to/file.ttf) format("truetype")`,
  fontWeight: 'normal',
  fontStyle: 'normal'
});
```

If you have a Webpack build, install the `file-loader` npm package and import the actual files as paths.

## @keyframes
```javascript
import v from 'vudu';

const keyframeExample = () => {
  const styles = v({
    myAnimation: {
      width: '10px',
      height: '10px', 
      background: 'blue',
      borderRadius: '50%',
      animationName: 'moveCircle',
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      '@keyframes moveCircle': {
        '50%': {
          transform: 'translateX(50px)'
        },
        '100%': {
          transform: 'translateX(0px)'
        }
      }
    }  
  });
  return (
    <div className={styles.myAnimation}></div>
  );
};
```

## Targeting child elements
Sometimes, in cases where HTML is generated dynamically, you want to select a particular element or class name:
```javascript
const styles = v({
  targetChild: {
    'h1': { // by element type
      color: 'red'
    }
    'h1.class-name': { // by classname
      color: 'red'
    }
    'h1:hover': { // by pseudo class
      color: 'green'
    }
  }
});
```

## Nesting
```javascript
const styles = v({
  nest: {
    'h1': { // child of nest selector
      color: 'red',
      'span': { // child of h1
        color: 'green',
        '.child-of-span': { // child of span
          '@composes': [ someObject ] // composes works here too!
        }
      }
    }
  }
});
```

## Debugging
Console log what’s getting added to the stylesheet anywhere in your code with the `logOutput()` method. 

Note: since styles are added at runtime, it will only show ones added up to that point.

<3

MIT License