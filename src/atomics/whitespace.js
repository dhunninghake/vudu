const defaultScale = [0, 0.5, 1, 1.5, 2, 4, 8];

export const buildWhitespace = (options) => {
  let i = 0;
  let whitespaceClasses = {};
  let scale = options && options.scale ? options.scale : defaultScale;

  scale = scale.map(number => {
    return `${number}rem`;
  });

  while (i < scale.length) {
    whitespaceClasses[`p${i}`]  = { padding: scale[i] };
    whitespaceClasses[`pt${i}`] = { paddingTop: scale[i] };
    whitespaceClasses[`pb${i}`] = { paddingBottom: scale[i] };
    whitespaceClasses[`pl${i}`] = { paddingLeft: scale[i] };
    whitespaceClasses[`pr${i}`] = { paddingRight: scale[i] };
    whitespaceClasses[`px${i}`] = { paddingRight: scale[i], paddingLeft: scale[i] };
    whitespaceClasses[`py${i}`] = { paddingTop: scale[i], paddingBottom: scale[i] };
    
    whitespaceClasses[`m${i}`]  = { margin: scale[i] };
    whitespaceClasses[`mt${i}`] = { marginTop: scale[i] };
    whitespaceClasses[`mb${i}`] = { marginBottom: scale[i] };
    whitespaceClasses[`ml${i}`] = { marginLeft: scale[i] };
    whitespaceClasses[`mr${i}`] = { marginRight: scale[i] };
    whitespaceClasses[`mx${i}`] = { marginRight: scale[i], marginLeft: scale[i] };
    whitespaceClasses[`my${i}`] = { marginTop: scale[i], marginBottom: scale[i] };

    if (i > 0) {
      whitespaceClasses[`mxn${i}`] = { marginRight: `-${scale[i]}`, marginLeft: `-${scale[i]}` };
    }

    i++;
  }

  whitespaceClasses['ml-auto'] = { marginLeft: 'auto' };
  whitespaceClasses['mr-auto'] = { marginRight: 'auto' };
  whitespaceClasses['mx-auto'] = { marginRight: 'auto', marginLeft: 'auto' };

  return whitespaceClasses;
};

