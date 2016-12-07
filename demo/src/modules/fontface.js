import React from 'react';
import v from '../../../dist/vudu';
import { TwoColumn } from '../components';
import { sharedStyles as shared } from '../styles/shared';
import { s_ttf, s_woff, s_woff2 } from '../fonts';

const e = v.composes;

const rawCode = `import v from 'vudu';

const component = () = {
  const SuezOne = v.addFontFace({  
    fontFamily: 'SuezOne',
    src: \`url(/path/to/file.eot) format("eot"),
      url(/path/to/file.woff2) format("woff2"),
      url(/path/to/file.woff) format("woff"),
      url(/path/to/file.ttf) format("truetype")\`,
    fontWeight: 'normal',
    fontStyle: 'normal'
  });
  const styles = v({
    typeface: {
      fontFamily: \`\$\{SuezOne\}, serif\`
    }
  });
  return (
    <p className={styles.keyframe}>Vudu supports @font-face!</p>
  );  
};`;

export const FontFace = () => {
  const SuezOne = v.addFontFace({  
    fontFamily: 'SuezOne',
    src: `url(${s_woff2}) format("woff2"),
      url(${s_woff}) format("woff"),
      url(${s_ttf}) format("truetype")`,
    fontWeight: 'normal',
    fontStyle: 'normal'
  });
  const styles = v({
    fontface: {
      'ol': {
        '@composes': [ e.h3, e.pl2 ],
        'li': {
          '@composes': [ e.mb2 ]
        }
      }
    },
    typeface: {
      fontFamily: `${SuezOne}, serif`
    }
  });
  return (
    <div id="fontface">
      <TwoColumn
        leftCol={(
          <span className={shared.eyelash}>{'@font-face'}</span>
        )}
        rightCol={(
          <div className={styles.fontface}>
            <p>{'Vudu comes with a public '}<span className={shared.highlight}>addFontFace</span>{' method which does two things:'}</p>
            <ol>
              <li>{'Attaches a CSS rule for the object you pass in'}</li>
              <li>{'Returns the fontFamily name you give it'}</li>
            </ol>
            <p>That way, you can setup your font stack with a template literal.</p>
            <div className={shared.codeContainer}>
              <div className={shared.codeExecuted}>
                <p className={styles.typeface}>{'Vudu supports @font-face!'}</p>
              </div>
              <div className={shared.codeRaw}>
                <pre>
                  <code>{rawCode}</code>
                </pre>
              </div>
            </div>
            <p>Font above is “Suez One” by Michal Sahar.</p>
          </div>
        )}/>
    </div>
  );
};