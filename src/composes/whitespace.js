const defaultScale = [0, 0.5, 1, 1.5, 2, 4, 8];

export const buildWhitespace = options => {
  let i = 0;
  let whitespace = {};
  let scale = options && options.scale ? options.scale : defaultScale;

  scale = scale.map(number => {
    return `${number}rem`;
  });

  while (i < scale.length) {
    whitespace[`p${i}`] = { padding: scale[i] };
    whitespace[`pt${i}`] = { paddingTop: scale[i] };
    whitespace[`pb${i}`] = { paddingBottom: scale[i] };
    whitespace[`pl${i}`] = { paddingLeft: scale[i] };
    whitespace[`pr${i}`] = { paddingRight: scale[i] };
    whitespace[`px${i}`] = { paddingRight: scale[i], paddingLeft: scale[i] };
    whitespace[`py${i}`] = { paddingTop: scale[i], paddingBottom: scale[i] };

    whitespace[`m${i}`] = { margin: scale[i] };
    whitespace[`mt${i}`] = { marginTop: scale[i] };
    whitespace[`mb${i}`] = { marginBottom: scale[i] };
    whitespace[`ml${i}`] = { marginLeft: scale[i] };
    whitespace[`mr${i}`] = { marginRight: scale[i] };
    whitespace[`mx${i}`] = { marginRight: scale[i], marginLeft: scale[i] };
    whitespace[`my${i}`] = { marginTop: scale[i], marginBottom: scale[i] };

    if (i > 0) {
      whitespace[`mxn${i}`] = {
        marginRight: `-${scale[i]}`,
        marginLeft: `-${scale[i]}`,
      };
    }

    i++;
  }

  whitespace['mlAuto'] = { marginLeft: 'auto' };
  whitespace['mrAuto'] = { marginRight: 'auto' };
  whitespace['mxAuto'] = { marginRight: 'auto', marginLeft: 'auto' };

  return whitespace;
};
