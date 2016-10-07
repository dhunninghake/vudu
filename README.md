# ✨Vudu
A composable approach to writing styles in JavaScript

## Features
* Supports media queries
* Supports pseudo selectors `:hover`, `:active`, etc
* Generates animation sequences with @keyframes
* Provides configurable, immutable style utilities out of the box
* Plays nice with or without popular frameworks like React, Ember, and Angular
* Generates necessary styles at runtime, no globals
* No external stylesheets to include, no duplicate rulesets
* Can be used with server-side rendering
* Lightweight (18kb minified, 6kb gzipped)
* Only one dependency
* Autoprefixes styles
* Author **dynamic** and **stateful** styles with JS!

## Getting Started
```bash
npm install vudu -D
```
```javascript
// UI component usage
import React from 'react';
import { v } from 'vudu';

const exampleComponent = () => {
  const styles = v({
    red: {
      color: 'red'
    },
    whitespace: {
      padding: '2rem'
    },
    columns: {
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
      <div className={styles.red}>
        <p>{'This is red'}</p>
      </div>
      <div className={styles.whitespace}>
        <p>{'This has a padding of 2rem around the outside'}</p>
      </div>
      <div className={styles.columns}>
        <p>{'Full width on mobile, 1/2 width on small breakpoint, 1/3 on medium, 1/4 on large'}</p>
      </div>
    </section>
  );
}
```

## Composability FTW!
By default Vudu supports writing out full declarations for styles (like shown above). However, one of its key features is the ability to compose small, immutable, structured objects. These utility objects are available out of the box to be used as building blocks to create complex style structures.

Using the example above, this is how it could ALSO be written:

```javascript
import { v, atomics as c } from 'vudu';

const styles = v({
  red: {
    '@composes': [ c.red ]
  },
  whitespace: {
    '@composes': [ c.p2 ]
  },
  columns: {
    '@composes': [ 
      c.col12,
      c.smCol6,
      c.mdCol4,
      c.lgCol3 
    ]
  }
});
```

### Configuring composable objects
Still a WIP here, but here are a few ways to customize 

```javascript
import { config } from 'vudu';

const newAtomicsObject = config({
  
  // Defaults to 12 columns
  columns: 16,

  // Defaults to colors from clrs.cc
  // Custom colors are appended to defaults
  colors: {
    brick: '#6D0404',
    slate: '#383943',
    wheat: '#E0C075'
  },

  // Scale means whitespace - margins and padding
  // Defaults to [0, .5, 1, 1.5, 2, 4, 8] in rem
  scale: [0, .25, .5, .75, 1, 2, 4]

});
```

## @font-face
Use all formats for greatest compatibility, however it will work as long as at one source is declared. Keep in mind that the path to the file is relative to the HTML file where the stylesheet is loaded! 

```javascript
v({
  calibre: {
    '@font-face': {
      fontFamily: 'CalibreRegular',
      sources: [
        { path: '/path/to/file.eot', format: 'embedded-opentype' },
        { path: '/path/to/file.woff2', format: 'woff2' },
        { path: '/path/to/file.woff', format: 'woff' },
        { path: '/path/to/file.ttf', format: 'truetype' },
      ],
      fontWeight: 'normal',
      fontStyle: 'normal'
    }
  }
});
```

If you have a Webpack build, install the `file-loader` npm package and import the actual files as paths.
```javascript
// webpack.config.js
module: {
  loaders: [
    {
      loader: 'file-loader',
      test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/
    }
  ]
}
```


## @keyframes
```javascript
import { v, atomics as c } from 'vudu';

const keyframeExample = () => {
  const styles = v({
    myAnimation: {
      width: '10px',
      height: '10px', 
      animationName: 'moveCircle',
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      '@composes': {
        c.bgBlue, // { backgroundColor: 'blue' }
        c.circle  // { borderRadius: '50%' }
      },
      '@keyframes moveCircle': {
        '0%': {
          transform: 'translateX(0px)'
        },
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

    // By element type
    'h1': {
      color: 'red'
    }

    // By class name (must include element type, h1 in this case)
    'h1.class-name': {
      color: 'red'
    }

    // By pseudo class
    'h1:hover': {
      color: 'green'
    }

  }
});
```

<3

MIT License