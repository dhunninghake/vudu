import test from 'ava';
import { createStyleSheet } from '../src/utils';
import v from '../src/vudu';

const style = {
  color: 'chartreuse',
};

test('attaches a style tag', t => {
  t.plan(1);
  createStyleSheet();
  return Promise.resolve(document.getElementById('vStyleSheet').tagName)
    .then(tag => {
      t.is(tag, 'STYLE');
    });
});

test('attaches only one style tag', t => {
  t.plan(2);
  createStyleSheet();
  t.is(document.getElementsByTagName("STYLE").length, 1);
  createStyleSheet();
  t.is(document.getElementsByTagName("STYLE").length, 1);
});

// test('', t => {

// });