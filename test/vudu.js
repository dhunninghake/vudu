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
  cache.clear();
  sheet.reset();
});

test.afterEach(() => {
  cache.clear();
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
  t.is(typeof style[0], 'string');
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
  
});

