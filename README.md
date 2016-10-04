# Vudu
A CSS-in-JS solution focused on composability

## Features
* Supports media queries
* Supports all pseudo selectors `:hover`, `:active`, etc
* Generates animation sequences with @keyframes
* Provides configurable, immutable style utilities out of the box
* Plays nice with or without popular frameworks like React, Ember, and Angular
* Generates necessary styles at runtime, no globals
* Avoids duplicate rulesets
* No external stylesheets to include
* Can be used with server-side rendering
* Lightweight (18kb minified, 6kb gzipped)
* Collocates styles with JS components
* Only one dependency
* Autoprefixes styles
* Author dynamic styles with JS!
  * Extend plain old objects
  * Functions
  * Conditionals
  * Module imports
  * **Stateful styling**

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
    grid: {
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
  render() {
    return(
      <section>
        <div className={styles.red}>
          <p>This is red, and turns green on hover</p>
        </div>
        <div className={styles.whitespace}>
          <p>This has a padding of 2rem around the outside</p>
        </div>
        <div className={styles.grid}>
          <p>Full width on mobile, 1/2 width on small breakpoint, 1/3 on medium, 1/4 on large</p>
        </div>
      </section>
    );
  } 
}
```

## Composability FTW!
By default Vudu supports writing out full declarations for styles (like shown above). However, one of its key features is the ability to compose small, immutable, structured objects. These utility objects can be used as building blocks to create more complex style structures. Read more about this.

Using the example above, this is how it could ALSO be written:

```javascript
// Import object of atomic styles
import { atomics as a } from 'vudu';
import { v } from 'vudu';

const styles = v({
  red: {
    '@compose': [ a.red ]
  },
  whitespace: {
    '@compose': [ a.p2 ]
  },
  grid: {
    '@compose': [ 
      a.col12,
      a.smCol6,
      a.mdCol4,
      a.lgCol3 
    ]
  }
});
```

### Configuring composable objects
But I have my own colors / grid / spacing! Fear not, you can configure the atomics object that gets generated. 

```javascript
import { config } from 'vudu';

const newAtomicsObject = config({
  
  // Defaults to 12 columns
  columns: 16,

  // Defaults to colors found on http://clrs.cc.
  // Your custom colors will be appended to the defaults
  colors: {
    brick: '#6D0404',
    slate: '#383943',
    wheat: '#E0C075'
  },

  // Scale refers to your whitespace - margins and padding
  // By default it’s set to [0, .5, 1, 1.5, 2, 4, 8] in rem
  scale: [0, .25, .5, .75, 1, 2, 4]

  // More configs coming soon!

});
```



<3

MIT License