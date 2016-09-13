import test from 'ava';
import { guid } from '../src/utils';
import v, { cache, sheet } from '../src/vudu';

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
  t.context.sheet = sheet.create(id);
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

