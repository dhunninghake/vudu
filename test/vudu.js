import test from 'ava';
import vudu from '../src/vudu';

test.afterEach.always(() => {
  vudu.reset();
});

test('vudu is a function', t => {
  t.plan(1);
  t.is(typeof vudu, 'function');
});

test('vudu doesn’t throw', t => {
  t.notThrows(() => {
    vudu({ color: 'chartreuse' });
  });
});

test('vudu methods', t => {
  t.plan(2);
  t.is(typeof vudu.css, 'function');
  t.is(typeof vudu.reset, 'function');
});

test('returns a random classname', t => {
  t.plan(1);
  const c = vudu({ color: 'chartreuse' });
  t.regex(c, /^.v-/);
});

test('returns a deterministed classname', t => {
  t.plan(1);
  const c = vudu('.red')({ color: 'red' });
  t.is(c, '.red');
});

test('only adds rule once if cached object', t => {
  t.plan(1);
  vudu('.hi')({ color: 'chartreuse' });
  vudu('.hi')({ color: 'chartreuse' });
  t.is(vudu.css(), '.hi{color:chartreuse;}');
});

test('handles pseudo selectors', t => {
  t.plan(1);
  vudu('.hi')({ ':hover': { color: 'red' } });
  t.is(vudu.css(), '.hi:hover{color:red;}');
});

test('handles media queries', t => {
  t.plan(1);
  vudu('.hi')({ '@media (min-width: 32em)': { color: 'red' } });
  t.is(vudu.css(), '@media (min-width: 32em){.hi{color:red;}}');
});

test('handles targeting child elements', t => {
  t.plan(1);
  vudu('.hi')({ a: { color: 'red' } });
  t.is(vudu.css(), '.hi a{color:red;}');
});

test('handles nesting', t => {
  t.plan(1);
  vudu('.hi')({ a: { ':hover': { span: { color: 'green' } } } });
  t.is(vudu.css(), '.hi a:hover span{color:green;}');
});

test('doesnt kebab selector strings within brackets', t => {
  t.plan(1);
  vudu('.hi')({ 'input[name="coolName"]': { color: 'red' } });
  t.is(vudu.css(), '.hi input[name="coolName"]{color:red;}');
});

test('handles prefixing selector properties', t => {
  t.plan(1);
  vudu('.hi')({ alignItems: 'center' });
  t.is(vudu.css(), '.hi{-webkit-box-align:center;align-items:center;}');
});

test('handles prefixing selector values', t => {
  t.plan(1);
  vudu('.hi')({ display: 'flex' });
  t.is(
    vudu.css(),
    '.hi{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;}'
  );
});
