export const buildPositioning = () => {
  const positioning = {};

  positioning['fixed'] = { position: 'fixed', willChange: 'transform' };
  positioning['relative'] = { position: 'relative' };
  positioning['absolute'] = { position: 'absolute' };

  positioning['top0'] = { top: 0 };
  positioning['left0'] = { left: 0 };
  positioning['bottom0'] = { bottom: 0 };
  positioning['right0'] = { right: 0 };

  positioning['z1'] = { zIndex: 1 };
  positioning['z2'] = { zIndex: 2 };
  positioning['z3'] = { zIndex: 3 };
  positioning['z4'] = { zIndex: 4 };

  return positioning;
};
