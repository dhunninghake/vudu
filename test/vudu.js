import test from 'ava';
import { createStyleSheet } from '../src/utils';

test('attaches a STYLE tag', async t => {
  t.plan(1);
  createStyleSheet();
  const styleTag = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tag = document.getElementById('vStyleSheet');
        resolve(tag.tagName);
      }, 500);
    });  
  };
  t.is(await styleTag(), 'STYLE');
});

test('attaches only one STYLE tag', t => {
  t.plan(2);
  createStyleSheet();
  t.is(document.getElementsByTagName("STYLE").length, 1);
  createStyleSheet();
  t.is(document.getElementsByTagName("STYLE").length, 1);
});