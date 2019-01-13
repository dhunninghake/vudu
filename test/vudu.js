import test from 'ava';
import v from '../src/vudu';

const styles = {
  container: {
    color: 'chartreuse',
  },
  heading: {
    fontSize: '2rem',
  },
};

test('only adds rule once if deep equal', t => {
  t.plan(1);
  const style1 = {
    container: {
      color: 'red',
      textAlign: 'right',
    },
  };
  const style2 = {
    container: {
      textAlign: 'right',
      color: 'red',
    },
  };

  v(style1, t.context.sheet);
  v(style2, t.context.sheet);

  t.is(t.context.sheet.cssRules.length, 1);
});
