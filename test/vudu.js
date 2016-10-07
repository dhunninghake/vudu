import test from 'ava';
import v, { cache, atomics } from '../dist/vudu';

const createSheet = (id) => {
  const existingSheet = document.getElementById(id);
  if (existingSheet) {
    return existingSheet.sheet;
  } else {
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(''));
    style.setAttribute('id', id);
    document.head.appendChild(style);
    return style.sheet;
  }
};

const guid = () => {
  return Math.random().toString(26).substring(2, 10) +
    Math.random().toString(26).substring(2, 10);
};

const styles = {
  container: {
    color: 'chartreuse',
  },
  heading: {
    fontSize: '2rem'
  }
};


test.beforeEach(t => {
  const id = guid();
  cache.clearItems();
  t.context.id = id;
  t.context.sheet = createSheet(id);
});


test('doesnt throw an error', t => {
  t.notThrows(() => {
    v(styles);
  });
});


test('attaches a style tag', t => {
  t.plan(1);
  return Promise.resolve(document.getElementById(t.context.id).tagName)
    .then(tag => {
      t.is(tag, 'STYLE');
    });
});


test('returns an object of values with type string', t => {
  t.plan(2);
  const style = v(styles);
  t.is(typeof style, 'object');
  t.is(typeof style.container, 'string');
});


test('adds to cache successfully', t => {
  const style = v(styles);
  t.is(cache.items.length, 1);
});


test('doesnt add to cache if deep equal', t => {
  const style1 = {
    container: {
      color: 'red',
      textAlign: 'right'
    }
  };
  const style2 = {
    container: {
      textAlign: 'right',
      color: 'red'
    }
  };

  v(style1);
  v(style2);

  t.is(cache.items.length, 1);
});


test('creates @media query rules', t => {
  t.plan(1);
  const styles = {
    container: {
      width: '50%',
      '@media (min-width: 40em)': {
        width: '75%'
      }
    }
  };

  v(styles, t.context.sheet);

  const mediaRule = t.context.sheet.cssRules[1];
  t.true(mediaRule.hasOwnProperty('media'));
});


test('creates @media rules in the correct order', t => {
  t.plan(3);
  const breakpoints = [
    '(min-width: 40em)',
    '(min-width: 52em)',
    '(min-width: 64em)'
  ];
  const styles = {
    container: {
      width: '50%',
      [`@media ${breakpoints[0]}`]: {
        width: '75%'
      },
      [`@media ${breakpoints[1]}`]: {
        width: '85%'
      },
      [`@media ${breakpoints[2]}`]: {
        width: '95%'
      },
    }
  };

  v(styles, t.context.sheet);

  const rules = t.context.sheet.cssRules;
  t.is(rules[1].media[0], breakpoints[0]);
  t.is(rules[2].media[0], breakpoints[1]);
  t.is(rules[3].media[0], breakpoints[2]);
});


test('creates pseudo selectors', t => {
  t.plan(2);
  const pseudo = ':hover';
  const styles = {
    container: {
      color: 'yellow',
      [pseudo]: {
        color: 'blue'
      }
    }
  };

  v(styles, t.context.sheet);

  const rules = t.context.sheet.cssRules;
  t.is(rules.length, 2);

  const selector = rules[1].selectorText;
  t.true(selector.includes(pseudo));
});


test('creates @keyframes rules', t => {
  t.plan(2);
  const name = 'changeColor';
  const styles = {
    container: {
      color: 'blue',
      animationName: name,
      animationDuration: '4s',
      animationIterationCount: 'infinite',
      [`@keyframes ${name}`]: {
        '0%':   { color: 'blue' },
        '50%':  { color: 'green' },
        '100%': { color: 'blue' }
      }
    }
  };

  v(styles, t.context.sheet);

  const rules = t.context.sheet.cssRules;
  t.is(rules.length, 2);

  const keyrule = rules[1].cssRules[0];
  t.true(keyrule.hasOwnProperty('keyText'));
});


test('adds vendor prefixes', t => {
  t.plan(3);
  const styles = {
    columns: {
      columnCount: '3',
      columnGap: '10px',
    }
  };

  v(styles, t.context.sheet);

  const rule = t.context.sheet.cssRules[0].style;
  t.is(rule[0], 'column-count');
  t.is(rule[2], '-webkit-column-count');
  t.is(rule[3], '-moz-column-count');
});


test('creates @font-face rule', t => {
  t.plan(1);
  const paths = {
    eot: 'df228136e3ffa29078f5e7bea378b384.eot',
    woff2: '5de2bf0fc200189f0f574489addec42b.woff2',
    woff: '9264697e1103c572c9d1dd7e3df81136.woff',
    ttf: '125b49e0eabb42aeb9fb8ad0d2a1581b.ttf'
  }
  const styles = {
    font: {
      '@font-face': {
        fontFamily: 'CalibreRegular',
        sources: [
          { path: paths.eot, format: 'embedded-opentype' },
          { path: paths.woff2, format: 'woff2' },
          { path: paths.woff, format: 'woff' },
          { path: paths.ttf, format: 'truetype' },
        ],
        fontWeight: 'normal',
        fontStyle: 'normal'
      }
    }
  };

  v(styles, t.context.sheet);

  t.is(t.context.sheet.cssRules[0].style.length, 4);
});


test('extends atomic classes', async t => {
  t.plan(1);
  const styles = {
    extend: {
      textAlign: 'right',
      '@composes': [
        atomics.left,
        atomics.py4,
        atomics.purple
      ]
    }
  };

  const getExtends = () => {
    return new Promise((resolve, reject) => {
      v(styles, t.context.sheet);
      setTimeout(() => {
        resolve(t.context.sheet.cssRules[0].style.length);
      });
    });
  };

  t.is(await getExtends(), 5);
});


test('extends pseudo and media query atomics', async t => {
  t.plan(1);
  const styles = {
    extendSomething: {
      '@composes': [
        atomics.col6,
        atomics.mdCol4
      ]
    }
  };

  const getExtends = () => {
    return new Promise((resolve, reject) => {
      v(styles, t.context.sheet);
      setTimeout(() => {
        resolve(t.context.sheet.cssRules.length);
      });
    });
  };

  t.is(await getExtends(), 2);
});

