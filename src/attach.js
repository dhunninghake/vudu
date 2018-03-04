const joinDeclarations = style => {
  return style
    .filter(s => typeof s.value !== 'object')
    .map(s => `${s.key}: ${s.value}`)
    .join(';');
};

const buildRule = (s, classname) => {
  if (s.key.startsWith(':')) {
    return {
      classname: `${classname}${s.key}`,
      rule: `.${classname}${s.key} { ${joinDeclarations(s.value)}; }`,
    };
  } else if (s.key.startsWith('@media')) {
    return {
      classname: `${classname}`,
      rule: `${s.key} { .${classname} { ${joinDeclarations(s.value)} } }`,
    };
  } else if (s.key.startsWith('@keyframes')) {
    const dec = s.value
      .map(kf => `${kf.key} { ${joinDeclarations(kf.value)}; }`)
      .join(' ');
    return {
      classname: `${s.key}`,
      rule: `${s.key} { ${dec} }`,
    };
  } else {
    return {
      classname: `${classname} ${s.key}`,
      rule: `.${classname} ${s.key} { ${joinDeclarations(s.value)}; }`,
    };
  }
};

export const attachRule = (rule, sheet) => {
  if (typeof document === 'undefined') {
    return;
  }
  try {
    sheet.insertRule(rule, sheet.cssRules.length);
  } catch (e) {
    console.warn('Vudu: Failed to insert rule:', rule, e);
  }
};

export const addRule = (styles, classname, sheet, addBase) => {
  const declarations = joinDeclarations(styles);

  if (addBase && declarations.length) {
    attachRule(`.${classname} { ${declarations}; }`, sheet);
  }

  styles.filter(s => typeof s.value === 'object').forEach(s => {
    const b = buildRule(s, classname);

    if (s.query) {
      attachRule(`${s.query} { ${b.rule} }`, sheet);
    } else {
      attachRule(b.rule, sheet);
    }

    if (!s.key.startsWith('@keyframes')) {
      addRule(s.value, b.classname, sheet, false);
    }
  });
};
