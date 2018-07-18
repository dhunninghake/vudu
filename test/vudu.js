import test from 'ava';
import v from '../dist/vudu';

const c = v.composes;

const createSheet = id => {
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
  return (
    Math.random()
      .toString(26)
      .substring(2, 10) +
    Math.random()
      .toString(26)
      .substring(2, 10)
  );
};

const styles = {
  container: {
    color: 'chartreuse'
  },
  heading: {
    fontSize: '2rem'
  }
};

test.beforeEach(t => {
  const id = guid();
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
  return Promise.resolve(document.getElementById(t.context.id).tagName).then(
    tag => {
      t.is(tag, 'STYLE');
    }
  );
});

test('returns an object of values with type string', t => {
  t.plan(2);
  const style = v(styles);
  t.is(typeof style, 'object');
  t.is(typeof style.container, 'string');
});

test('handles suffix string configuration via options properly', t => {
  t.plan(2);

  const suffix = 'test';
  const style1 = {
    container: {
      color: 'blue',
      textAlign: 'left'
    }
  };

  v.options({ suffix })(style1, t.context.sheet);
  t.is(t.context.sheet.cssRules.length, 1);
  t.true(RegExp(`${suffix}$`).test(t.context.sheet.cssRules[0].selectorText))
});

test('handles suffix function configuration via options properly', t => {
  t.plan(2);

  const suffixText = 'test'
  const suffix = () => suffixText;
  const style1 = {
    container: {
      color: 'yellow',
      textAlign: 'center'
    }
  };

  v.options({ suffix })(style1, t.context.sheet);
  t.is(t.context.sheet.cssRules.length, 1);
  t.true(RegExp(`${suffixText}$`).test(t.context.sheet.cssRules[0].selectorText))
});

test('only adds rule once if deep equal', t => {
  t.plan(1);
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

  v(style1, t.context.sheet);
  v(style2, t.context.sheet);

  t.is(t.context.sheet.cssRules.length, 1);
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
      }
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
        '0%': { color: 'blue' },
        '50%': { color: 'green' },
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
  t.plan(6);
  const styles = {
    columns: {
      columnCount: '3',
      columnGap: '10px'
    }
  };

  v(styles, t.context.sheet);

  const rule = t.context.sheet.cssRules[0].style;

  t.is(rule[0], '-webkit-column-count');
  t.is(rule[1], '-moz-column-count');
  t.is(rule[2], '-webkit-column-gap');
  t.is(rule[3], '-moz-column-gap');
  t.is(rule[4], 'column-count');
  t.is(rule[5], 'column-gap');
});

test('creates @font-face rule', t => {
  t.plan(1);

  v.addFontFace(
    {
      fontFamily: 'CalibreRegular',
      src: `url(blah.woff2) format("woff2"),
      url(blah.woff) format("woff"),
      url(balh.ttf) format("truetype")`,
      fontWeight: 'normal',
      fontStyle: 'normal'
    },
    t.context.sheet
  );

  t.is(t.context.sheet.cssRules[0].style.length, 4);
});

test('extends atomic classes', async t => {
  t.plan(1);
  const styles = {
    extend: {
      textAlign: 'right',
      '@composes': [c.left, c.py4, c.purple]
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
      '@composes': [c.col6, c.mdCol4]
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

test('doesnt camelize selector strings within brackets', t => {
  t.plan(1);

  const selector = 'input[name="coolName"]';
  const styles = {
    namespace: {
      [selector]: {
        background: 'wheat'
      }
    }
  };

  v(styles, t.context.sheet);

  const rule = t.context.sheet.cssRules[0].style;
  const containsSelector = rule.parentRule.selectorText.includes(selector);

  t.true(containsSelector);
});
