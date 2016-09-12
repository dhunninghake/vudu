import test from 'ava';
import { createStyleSheet } from '../src/utils';
import v, { cache, sheet } from '../src/vudu';


const styles = {
  container: {
    color: 'chartreuse',
  },
  heading: {
    fontSize: '2rem'
  }
};

test.beforeEach(() => {
  cache.clearItems();
  sheet.reset();
});

test.afterEach(() => {
  cache.clearItems();
  sheet.reset();
});


test('doesnt throw an error', t => {
  t.notThrows(() => {
    v(styles);
  });
});


test('attaches a style tag', t => {
  t.plan(1);
  return Promise.resolve(document.getElementById('vStyleSheet').tagName)
    .then(tag => {
      t.is(tag, 'STYLE');
    });
});


test('attaches only one style tag', t => {
  sheet.create();
  t.is(document.getElementsByTagName("STYLE").length, 1);
});


test('returns an object of values with type string', t => {
  t.plan(2);
  const style = v(styles);
  t.is(typeof style, 'object');
  t.is(typeof style.container, 'string');
});


test('adds style groups to the cache', t => {
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
  v(styles);
  const mediaRule = sheet.stylesheet.cssRules[1];
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
  v(styles);
  t.is(sheet.stylesheet.cssRules[1].media[0], breakpoints[0]);
  t.is(sheet.stylesheet.cssRules[2].media[0], breakpoints[1]);
  t.is(sheet.stylesheet.cssRules[3].media[0], breakpoints[2]);
});




