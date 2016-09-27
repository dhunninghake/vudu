export const buildTypography = () => {
  const typographyClasses = {};

  typographyClasses['h0']          = { fontSize: '4rem' };
  typographyClasses['h1']          = { fontSize: '2rem' };
  typographyClasses['h2']          = { fontSize: '1.5rem' };
  typographyClasses['h3']          = { fontSize: '1.25rem' };
  typographyClasses['h4']          = { fontSize: '1rem' };
  typographyClasses['h5']          = { fontSize: '0.875rem' };
  typographyClasses['h6']          = { fontSize: '0.75rem' };

  typographyClasses['bold']        = { fontStyle: 'bold' };
  typographyClasses['regular']     = { fontStyle: 'regular' };
  typographyClasses['italic']      = { fontStyle: 'italic' };
  typographyClasses['caps']        = { textTransform: 'uppercase' };
  typographyClasses['center']      = { textAlign: 'center' };
  typographyClasses['leftAlign']   = { textAlign: 'left' };
  typographyClasses['rightAlign']  = { textAlign: 'right' };
  typographyClasses['justify']     = { textAlign: 'justify' };
  typographyClasses['noWrap']      = { whiteSpace: 'nowrap' };
  typographyClasses['underline']   = { textDecoration: 'underline' };
  typographyClasses['noUnderline'] = { textDecoration: 'none' };
  typographyClasses['trackedOut']  = { letterSpacing: '0.1em' };
  typographyClasses['listReset']   = { listStyle: 'none', paddingLeft: '0px' };

  return typographyClasses;
};

