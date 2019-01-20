# ✨Vudu

A composable approach to writing styles in JavaScript

## Features

- Media queries
- Pseudo selectors `:hover`, `:active`, etc
- Use it with or without frameworks like React, Ember, and Angular
- No external stylesheets to include, no duplicate rulesets
- Can be used with server-side rendering
- Lightweight (7kb)
- Only one dependency
- Autoprefixes styles
- Author **dynamic** and **stateful** styles with JS!

## Getting Started

```bash
npm install vudu --save
```

Vudu appends styles dynamically and returns a random class name:

```javascript
import vudu from 'vudu';

const Example = () => <div className={className} />;

const className = vudu({
  color: 'red',
  ':hover': {
    color: 'green',
  },
});
/*
 * .v-29383 { color: red; }
 **/
```

It's also possible to return a deterministic class name:

```javascript
const className = vudu('.hi')({
  color: 'red',
  ':hover': {
    color: 'green',
  },
});
/*
 * .hi { color: red; }
 * .hi:hover { color: green; }
 **/
```

Media queries:

```javascript
const className = vudu({
  color: 'red',
  '@media (min-width: 32em)': {
    color: 'green',
  },
});
/*
 * .v-29383 { color: red; }
 * @media (min-width: 32em) { .v-29383 { color: green; } }
 **/
```

Target global elements:

```javascript
const className = vudu('html, body')({
  margin: 0,
});
/*
 * html, body { margin: 0 }
 **/
```

Target child elements:

```javascript
const className = vudu({
  'span' {
    color: 'red'
  }
});
/*
 * .v-29383 span { color: red; }
 **/
```

Nest elements infinitely deep:

```javascript
const className = vudu({
  color: 'red',
  'span' {
    color: 'green'
    ':hover': {
      color: 'purple'
    }
  }
});
/*
 * .v-29383 { color: red; }
 * .v-29383 span { color: green; }
 * .v-29383 span:hover { color: purple; }
 **/
```

## vudu.reset

Clear the current stylesheet.

## vudu.css

Get all current styles as a string.

<3

MIT License
