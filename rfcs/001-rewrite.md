January 20, 2019

# Summary

In this RFC, I’m proposing a modified approach to writing styles in JS with Vudu.

See an associated PR 👉🏼 https://github.com/dhunninghake/vudu/pull/23

Vudu 2.0...

- Is a smaller package size — `7.2kb` vs the current `18.6kb`.
- Takes a less opinionated approach to writing and composing JS objects.
- Exposes a simpler API for creating and interacting with styles.

# Basic example

The main difference is that objects passed to vudu do not need to be named. Like the previous version, it will generate a random class name and return it after appending the styles:

```js
import vudu from 'vudu';

export const Example = () => <div className={className} />;

const className = vudu({
  color: 'red',
  ':hover': {
    color: 'green',
  },
});
```

It is also possible to achieve a deterministic class name by passing a string as the first argument and currying your style object:

```js
import vudu from 'vudu';

export const Example = () => <div className="hi" />;

const className = vudu('.hi')({
  color: 'red',
  ':hover': {
    color: 'green',
  },
});
```

You can pass multiple objects and get an array of classes back:

```js
import vudu from 'vudu';

export const Example = () => (
  <>
    <div className={c1} />
    <div className={c2} />
  </>
);

const [c1, c2] = vudu({ color: 'red' }, { color: 'blue' });
```

# Motivation

A few observations about the package after using it for some time:

- **Naming each style object is cumbersome** - previously it was required that any object passed to vudu needed a key. Over time this became a nuisance, especially when I just wanted styles generated without having to name them.

```js
const className = vudu({
  container: {               // <---- this
    color: 'red',
  },
});
```

- **Composes keyword is unnecessary with es6** - one of the key concepts with vudu 1.0 was `@composes`. This was an array of pre-generated objects that could be imported and used in components. Instead of parsing this array, I've been using the spread operator to compose smaller atomic style objects.
- **The package src is hard to follow** - I was the one who wrote the initial version of vudu, and yet every time I come back to make updates or optimizations, I think "how the f does this work". So I started a rewrite one day and found that I could get nearly the same functionality with _way_ less code. Now, nearly all logic takes place in a single recursive function.

# Detailed design

### Breaking changes

The following features have been removed in Vudu 2.0, and the reasons why:

- **`v.composes`** - Support for this monolithic object of atomic styles is being removed to keep the package lean. This functionality can easily be achieved by writing a thin wrapper around vudu.
- **`@composes`** - As mentioned before, this feature can be achieved with simply spreading cached atomic style objects into an object passed to vudu.
- **`@font-face`** - Setting up typefaces is mostly a static operation. Do it once at the top of the app and then leave it alone. Because of this, a static stylesheet for fonts seems like a better option.
- **`@keyframes`** - Generating keyframes with JS can be very dynamic and powerful, but I rarely ever used this feature. I might add support for this feature back in, but still on the fence.
- **Custom style sheet** - Only included this feature for testing purposes. Vudu 2.0 takes a different approach to testing.

### Stayed the same

- **Random class names** - Vudu continues to generate and return a random class names for unnamed style objects passed to it.
- **Vendor prefixing** - The `inline-style-prefixer` package accounts for `5.8kb` of the `7.2kb` vudu is now becoming. It’s a lot, but I consider it a worthy cost in order to build robust components which stand up to varying browser css feature support.

### New additions

- **Deterministic class names** - This means it’s possible to assign a class name to style objects. Additionally, this opens the door to setting css for global elements.
- **New methods** - `.reset()` and `.css()` are now available to empty the current stylesheet or read from it.

# Migration Path

A look at how to move forward regarding the breaking changes above:

### `v.composes`

Currently the only way to get this monolithic object would be to write a wrapper around Vudu 2.0. It would be pretty simple. However, although this functionality is being removed from the base package, we could consider a secondary package in the repo that offers support for this object. That way the base stays lean while not removing this altogether. It might look something like:

```js
import composes from 'vudu/composes';
```

### `@composes`

This one is easy, it can be achieved with es6.

#### Before

```js
const className = v({
  container: {
    @composes: [red, pt2]
  }
});
```

#### After

```js
const className = vudu({
  ...red,
  ...pt2,
});
```

### `@font-face`

Create a static stylesheet with font declarations.

### `@keyframes`

Similar to font face, these can be added to a static sheet. It’s possible support for this will be added back in.

### `Custom style sheet`

Put all non-vudu styles in their own stylesheet. This feature was only meant for testing purposes.

# Looking ahead

One goal I want to keep in mind with vudu is that it continues to offer an option for inline styles with JS outside the context of a modern framework. Whether your build is in React, Vue, Ember, the next hot JS framework, or plain old JS, I want it to be flexible enough to adapt to your use case. Any refinements to the inner workings or the API in the future will be in the service of making it faster and more accessible to more developers.

<3
